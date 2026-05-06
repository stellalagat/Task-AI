import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:7000/api",
});

// 🔐 AUTO ATTACH TOKEN TO EVERY REQUEST
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
console.log("TOKEN:", token);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;