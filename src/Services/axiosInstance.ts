import axios from "axios";

const BASE_URL =
  import.meta.env.VITE_BASE_URL || "https://betting-app-backend-15gg.onrender.com";
export const WebSocket_URL =
  import.meta.env.VITE_WEBSOCKET_URL || "https://betting-app-backend-15gg.onrender.com";

  
// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: `${BASE_URL}/api/v1`, // Set the base URL once here
  headers: {
    "Content-Type": "application/json", // Set default headers if needed
  },
});

export default axiosInstance;
