import axios from "axios";

const Axios = axios.create({
  baseURL: "http://localhost:3000/api", // Adjust if your backend runs on a different port
  headers: {
    "Content-Type": "application/json",
  },
});

export default Axios;
