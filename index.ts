import app from "./app";
import { config } from "./config/env";

const PORT = config.port;

app.listen(PORT, () => {
  console.log("Project Harmony Backend API");
  console.log(`Server running on: http://localhost:${PORT}`);
  console.log(`External API: ${config.externalApiUrl}`);

  console.log("\nAvailable Endpoints:");
  console.log(`  GET  http://localhost:${PORT}/`);
  console.log(`  GET  http://localhost:${PORT}/api/student?id=<student_id>`);
});
