import axios from "axios";
import { config } from "../config/env";

/**
 * Student information response from external API
 * The external API returns data already formatted for Google Sheets!
 */
export interface StudentInfo {
  count?: number;
  regkey?: number;
  whitelist?: string | number;
  card_tag?: number;
  partner_id: string;
  email_address: string;
  department: string;
  guest_fullname?: string;
  reg_guest?: string | number;
  member?: any[];
  card_tag_uid?: string;
  checkIn?: string;
  [key: string]: any;
}

/**
 * Fetches student information from the external API
 * @param studentId - The student's partner_id (from RFID card)
 * @returns The student information in Google Sheets format
 */
export async function getStudentInfo(studentId: string): Promise<StudentInfo> {
  try {
    console.log(`[API Service] Fetching student info for ID: ${studentId}`);

    const url = `${config.externalApiUrl}/api/student`;
    console.log(`[API Service] URL: ${url}`);
    console.log(`[API Service] Params: { id: ${studentId} }`);

    const response = await axios.get(url, {
      params: { id: studentId },
      timeout: 10000,
    });

    console.log(`[API Service] Response from external API:`, JSON.stringify(response.data, null, 2));

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data?.error || error.response?.data?.message || error.message;
      console.error(`[API Service] Error response:`, error.response?.data);
      throw new Error(`External API Error: ${errorMessage}`);
    }
    throw error;
  }
}