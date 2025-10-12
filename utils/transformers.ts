import { ExternalApiResponse, GoogleSheetsRow } from "../types";
import { config } from "../config/env";

/**
 * Transforms the external API response to Google Sheets row format
 * @param apiResponse - The response from the external API
 * @returns Formatted data for Google Sheets
 */

export function transformToSheetsFormat(
  apiResponse: ExternalApiResponse
): GoogleSheetsRow {
  return {
    count: 0,
    regKey: config.regKey || "",
    whitelist: 1,
    card_tag: apiResponse.student.partner_id,
    partner_id: apiResponse.student.partner_id,
    email_address: apiResponse.student.email_address,
    department: apiResponse.student.department,
    guest_fullname: apiResponse.attendance.student_name,
    reg_guest: 0,
    card_tag_uid: apiResponse.student.card_tag_uid,
  };
}

/**
 * Formats a date to yyyy-MM-dd format for sheet names
 * @param date - The date to format
 * @returns Formatted date string
 */

export function formatDateForSheetName(date: Date = new Date()): string {
  return date.toISOString().split("T")[0];
}

/**
 * Formats a date to ISO string
 * @param date - The date to format
 * @returns Formatted timestamp string
 */

export function formatTimestamp(date = new Date()): string {
  return new Date(date).toLocaleString('en-PH', {
    hour12: false,
  }).replace(',', '');
}

