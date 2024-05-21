import axios from "axios";

const baseURL =
  process.env.NODE_ENV === "production"
    ? "http://13.209.32.56:8080/api"
    : "http://localhost:8080/api";

const axiosInstance = axios.create({
  baseURL: baseURL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = sessionStorage.getItem("accessToken");
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
