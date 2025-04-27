import Axios from "../utils/Axios";

export const getDashboardData = async () => {
  try {
    const res = await Axios.get("/details/");
    return res.data;
  } catch (err) {
    console.error("Error fetching dashboard data:", err);
    throw err;
  }
};
