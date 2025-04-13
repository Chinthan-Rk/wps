import express from "express";
import fs from "fs";

const router = express.Router();

router.get("/details", (req, res) => {
  const data = JSON.parse(
    fs.readFileSync("./mock/dashboard_mock_data.json", "utf-8")
  );
  res.json(data);
});

export default router;
