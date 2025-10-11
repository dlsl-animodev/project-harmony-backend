# Project Harmony Backend API

A middleware backend service that bridges Arduino attendance system with an external student attendance API and Google Sheets logging.

## Purpose

This backend receives student ID taps from Arduino devices, validates attendance through the QOL-API, and logs all attendance records to Google Sheets for tracking and reporting.


## Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd project-harmony-backend
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**

Create/edit `.env` file with the following:

```env
# Google Sheets Apps Script Web App URL
SHEETS_SCRIPT_WEB_APP_URL=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec

# External API Configuration (Render API) // QOL-API
EXTERNAL_API_URL=https://your-render-api.onrender.com

# Optional: Registration Key
REG_KEY=
```

4. **Start the development server**
```bash
npm run dev
```

Or for production:
```bash
npm start
```