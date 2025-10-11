import dotenv from "dotenv";
dotenv.config();

export const config = {
  port: process.env.PORT || 3001,
  externalApiUrl: process.env.EXTERNAL_API_URL || "http://localhost:3001",
  sheetsWebAppUrl: process.env.SHEETS_SCRIPT_WEB_APP_URL || "",
  regKey: process.env.REG_KEY || "",
  nodeEnv: process.env.NODE_ENV || "development",
};