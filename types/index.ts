export interface ExternalApiResponse {
  success: boolean;
  message: string;
  student: {
    email_address: string;
    department: string;
    partner_id: string;
    card_tag_uid: string;
  };
  attendance: {
    id: string;
    student_id: string;
    student_name: string;
    email_address: string;
    tapped_at: string;
    event_id: string;
  };
  event: {
    id: string;
    event_name: string;
    event_code: string;
    event_date: string;
  };
}

export interface GoogleSheetsRow {
  count: number;
  regKey: string;
  whitelist: number;
  card_tag: string;
  partner_id: string;
  email_address: string;
  department: string;
  guest_fullname: string;
  reg_guest: number;
  card_tag_uid: string;
}

export interface GoogleSheetsResponse {
  status: string;
  message: string;
  action?: "check_in" | "check_out";
}

export interface AttendanceResponse {
  success: boolean;
  message: string;
  externalApi: ExternalApiResponse;
  googleSheets: GoogleSheetsResponse;
  timestamp: string;
}

export interface AttendanceRecord {
  count: number;
  regkey: string;
  whitelist: number;
  card_tag: string;
  partner_id: string;
  email_address: string;
  department: string;
  guest_fullname: string;
  reg_guest: number;
  card_tag_uid: string;
  checkIn: string;
  check_out: string;
}

export interface SheetsGetResponse {
  status: string;
  sheetName: string;
  totalRows: number;
  headers: string[];
  data: any[][];
}
