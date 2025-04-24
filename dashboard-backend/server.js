import express from "express";
import dashboardRoutes from "./routes/dashboard.js";
import cors from "cors";
import jwt from "jsonwebtoken";

const app = express();
const PORT = 3000;
app.use(cors());

app.use("/api/dashboard", dashboardRoutes);

const SECRET_KEY = "chinthan"; // Can be anything for now

app.post("/api/login", (req, res) => {
  const user = {
    id: "demoUser",
    name: "Demo User",
  };

  // Generate a token
  const token = jwt.sign(user, SECRET_KEY, { expiresIn: "1h" });
  console.log("Token generated:", token);
  res.json({ token });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
