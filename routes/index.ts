import { Router } from "express";
import { handleStudentAttendance } from "../controllers/attendanceController";
import {
  getTodayReport,
  getDateReport,
  getDateRangeReport,
  getEmailReport,
  getDepartmentReport,
  getStudentReport,
} from "../controllers/reportsController";

const router = Router();

// get student attendance
// GET /api/student?id=STUDENT_ID
router.get("/student", handleStudentAttendance);

// GET /api/reports/today
// get all attendance records for today

router.get("/reports/today", getTodayReport);


// GET /api/reports/date/:date
// get attendance records for a specific date
// example: /api/reports/date/2025-10-11

router.get("/reports/date/:date", getDateReport);


// GET /api/reports/range?start=2025-10-01&end=2025-10-11
// get attendance records for a date range

router.get("/reports/range", getDateRangeReport);


// GET /api/reports/email/:email?date=2025-10-11
// get attendance records filtered by email
// example: /api/reports/email/student@dlsl.edu.ph

router.get("/reports/email/:email", getEmailReport);


// GET /api/reports/department/:department?date=2025-10-11
// get attendance records filtered by department
// example: /api/reports/department/IT1D

router.get("/reports/department/:department", getDepartmentReport);

// GET /api/reports/student/:partnerId?date=2025-10-11
// get attendance records filtered by partner ID (student ID)
// example: /api/reports/student/1700019550

router.get("/reports/student/:partnerId", getStudentReport);

export default router;
