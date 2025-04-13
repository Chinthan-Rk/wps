import express from "express";
import dashboardRoutes from "./routes/dashboard.js";
import cors from "cors";

const app = express();
const PORT = 3000;
app.use(cors());

app.use("/api/dashboard", dashboardRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
