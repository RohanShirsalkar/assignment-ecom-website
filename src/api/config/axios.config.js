import axios from "axios";

const api = axios.create({
  baseURL: "https://assignment-ecom-backend-production.up.railway.app",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
