import { Request, Response } from "express";
import {
  getTodayAttendance,
  getAttendanceByDate,
  getAttendanceByDateRange,
  getAttendanceByEmail,
  getAttendanceBySection,
  getAttendanceByPartnerId,
} from "../services/sheetsService";
import { formatTimestamp } from "../utils/transformers";


// get all attendance records for today
// GET /api/reports/today

export async function getTodayReport(req: Request, res: Response): Promise<void> {
  try {
    const data = await getTodayAttendance();

    res.status(200).json({
      success: true,
      message: "Today's attendance retrieved successfully",
      data: data,
      timestamp: formatTimestamp(),
    });
  } catch (error) {
    console.error(`[${new Date().toISOString()}] Error in getTodayReport:`, error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";

    res.status(500).json({
      success: false,
      error: "Failed to retrieve today's attendance",
      message: errorMessage,
      timestamp: formatTimestamp(),
    });
  }
}


// get attendance records for a specific date
// GET /api/reports/date/:date
// @param date - Date in YYYY-MM-DD format

export async function getDateReport(req: Request, res: Response): Promise<void> {
  try {
    const { date } = req.params;

    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(date)) {
      res.status(400).json({
        success: false,
        error: "Invalid date format",
        message: "Date must be in YYYY-MM-DD format (e.g., 2025-10-11)",
      });
      return;
    }

    const data = await getAttendanceByDate(date);

    res.status(200).json({
      success: true,
      message: `Attendance for ${date} retrieved successfully`,
      data: data,
      timestamp: formatTimestamp(),
    });
  } catch (error) {
    console.error(`[${new Date().toISOString()}] Error in getDateReport:`, error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";

    res.status(500).json({
      success: false,
      error: "Failed to retrieve attendance",
      message: errorMessage,
      timestamp: formatTimestamp(),
    });
  }
}


// get attendance records for a date range
// GET /api/reports/range?start=YYYY-MM-DD&end=YYYY-MM-DD

export async function getDateRangeReport(req: Request, res: Response): Promise<void> {
  try {
    const { start, end } = req.query;

    if (!start || !end) {
      res.status(400).json({
        success: false,
        error: "Missing parameters",
        message: "Both 'start' and 'end' date parameters are required",
      });
      return;
    }

    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(start as string) || !dateRegex.test(end as string)) {
      res.status(400).json({
        success: false,
        error: "Invalid date format",
        message: "Dates must be in YYYY-MM-DD format",
      });
      return;
    }

    const data = await getAttendanceByDateRange(start as string, end as string);

    res.status(200).json({
      success: true,
      message: `Attendance from ${start} to ${end} retrieved successfully`,
      totalRecords: data.length,
      data: data,
      timestamp: formatTimestamp(),
    });
  } catch (error) {
    console.error(`[${new Date().toISOString()}] Error in getDateRangeReport:`, error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";

    res.status(500).json({
      success: false,
      error: "Failed to retrieve attendance range",
      message: errorMessage,
      timestamp: formatTimestamp(),
    });
  }
}


// get attendance records filtered by email
// GET /api/reports/email/:email?date=YYYY-MM-DD

export async function getEmailReport(req: Request, res: Response): Promise<void> {
  try {
    const { email } = req.params;
    const { date } = req.query;

    if (!email) {
      res.status(400).json({
        success: false,
        error: "Missing parameter",
        message: "Email parameter is required",
      });
      return;
    }

    const targetDate = date ? (date as string) : undefined;
    const data = await getAttendanceByEmail(email, targetDate);

    res.status(200).json({
      success: true,
      message: `Attendance for ${email} retrieved successfully`,
      totalRecords: data.length,
      data: data,
      timestamp: formatTimestamp(),
    });
  } catch (error) {
    console.error(`[${new Date().toISOString()}] Error in getEmailReport:`, error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";

    res.status(500).json({
      success: false,
      error: "Failed to retrieve attendance by email",
      message: errorMessage,
      timestamp: formatTimestamp(),
    });
  }
}


// get attendance records filtered by section
// GET /api/reports/section/:section?date=YYYY-MM-DD

export async function getSectionReport(req: Request, res: Response): Promise<void> {
  try {
    const { section } = req.params;
    const { date } = req.query;

    if (!section) {
      res.status(400).json({
        success: false,
        error: "Missing parameter",
        message: "Section parameter is required",
      });
      return;
    }

    const targetDate = date ? (date as string) : undefined;
    const data = await getAttendanceBySection(section, targetDate);

    res.status(200).json({
      success: true,
      message: `Attendance for ${section} retrieved successfully`,
      totalRecords: data.length,
      data: data,
      timestamp: formatTimestamp(),
    });
  } catch (error) {
    console.error(`[${new Date().toISOString()}] Error in getSectionReport:`, error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";

    res.status(500).json({
      success: false,
      error: "Failed to retrieve attendance by section",
      message: errorMessage,
      timestamp: formatTimestamp(),
    });
  }
}

// get attendance records filtered by partner ID
// GET /api/reports/student/:partnerId?date=YYYY-MM-DD

export async function getStudentReport(req: Request, res: Response): Promise<void> {
  try {
    const { partnerId } = req.params;
    const { date } = req.query;

    if (!partnerId) {
      res.status(400).json({
        success: false,
        error: "Missing parameter",
        message: "Partner ID parameter is required",
      });
      return;
    }

    const targetDate = date ? (date as string) : undefined;
    const data = await getAttendanceByPartnerId(partnerId, targetDate);

    res.status(200).json({
      success: true,
      message: `Attendance for student ${partnerId} retrieved successfully`,
      totalRecords: data.length,
      data: data,
      timestamp: formatTimestamp(),
    });
  } catch (error) {
    console.error(`[${new Date().toISOString()}] Error in getStudentReport:`, error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";

    res.status(500).json({
      success: false,
      error: "Failed to retrieve attendance by student",
      message: errorMessage,
      timestamp: formatTimestamp(),
    });
  }
}
