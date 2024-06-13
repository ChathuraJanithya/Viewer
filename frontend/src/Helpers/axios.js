import axios from "axios";

// Create an Axios instance
const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}`,
});

api.interceptors.request.use(
  (config) => {
    // Get the token from session storage
    const authToken = sessionStorage.getItem("authToken");

    // If the token exists, attach it to the Authorization header
    if (authToken) {
      config.headers.Authorization = `Bearer ${authToken}`;
    }

    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

export default api;
