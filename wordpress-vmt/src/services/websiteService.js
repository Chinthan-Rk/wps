import axios from "../utils/Axios";

// Fetch all websites
export const getWebsites = async () => {
  const response = await axios.get("/websites");
  return response.data;
};

// Add (onboard) a new website
export const addWebsite = async (websiteData) => {
  const response = await axios.post("/websites", websiteData);
  return response.data;
};

// Start an Adhoc scan
export const startAdhocScan = async (scanData) => {
  const response = await axios.post("/adhoc-scan", scanData);
  return response.data;
};
