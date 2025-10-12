import { Request, Response } from "express";
import { getStudentInfo } from "../services/apiService";
import { saveToGoogleSheets } from "../services/sheetsService";
import { formatTimestamp } from "../utils/transformers";
import { config } from "../config/env";


export async function handleStudentAttendance(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const studentId = req.query.id as string;

    // Validate required parameter
    if (!studentId) {
      res.status(400).json({
        success: false,
        error: "Missing required parameter: id",
        message: "Please provide a student ID",
      });
      return;
    }

    console.log(`[${new Date().toISOString()}] Getting student info for: ${studentId}`);
    const studentData = await getStudentInfo(studentId);

    console.log(`[${new Date().toISOString()}] Student data retrieved:`, JSON.stringify(studentData, null, 2));

    const localCheckIn = formatTimestamp(new Date());

    const sheetsData = {
      count: studentData.count || 0,
      regKey: studentData.regkey?.toString() || config.regKey || "",
      whitelist: typeof studentData.whitelist === 'string' ? parseInt(studentData.whitelist) : (studentData.whitelist || 1),
      card_tag: studentData.card_tag?.toString() || studentData.partner_id,
      partner_id: studentData.partner_id,
      email_address: studentData.email_address,
      department: studentData.department || "",
      guest_fullname: studentData.guest_fullname || "",
      reg_guest: typeof studentData.reg_guest === 'string' ? parseInt(studentData.reg_guest) : (studentData.reg_guest || 0),
      card_tag_uid: studentData.card_tag_uid || studentData.partner_id,
      checkIn: localCheckIn,
    };

    console.log(`[${new Date().toISOString()}] Data prepared for sheets:`, JSON.stringify(sheetsData, null, 2));

    const sheetsResponse = await saveToGoogleSheets(sheetsData);

    console.log(`[${new Date().toISOString()}] Google Sheets response:`, JSON.stringify(sheetsResponse, null, 2));

    res.status(200).json({
      success: true,
      message: `Attendance logged successfully. Action: ${sheetsResponse.action}`,
      studentData: studentData,
      googleSheets: sheetsResponse,
      timestamp: formatTimestamp(),
    });
  } catch (error) {
    console.error(`[${new Date().toISOString()}] Error in handleStudentAttendance:`, error);

    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";

    res.status(500).json({
      success: false,
      error: "Internal server error",
      message: errorMessage,
      timestamp: formatTimestamp(),
    });
  }
}
