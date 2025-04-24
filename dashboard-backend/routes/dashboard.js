import express from "express";
import fs from "fs";
import jwt from "jsonwebtoken";
const router = express.Router();
const SECRET_KEY = "chinthan"; //

router.get("/websites", (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Missing token" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const user = jwt.verify(token, SECRET_KEY);
    // In future: filter websites by user.id
    const websites = JSON.parse(
      fs.readFileSync("./mock/websites_mock_data.json", "utf-8")
    );
    res.json(websites);
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
});

router.get("/details", (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Missing token" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const user = jwt.verify(token, SECRET_KEY);
    const data = JSON.parse(
      fs.readFileSync("./mock/dashboard_mock_data.json", "utf-8")
    );
    res.json(data);
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
});

export default router;
