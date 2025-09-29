import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api/auth", // backend auth routes prefix
  withCredentials: true, // send HttpOnly cookies
});

export default api;
