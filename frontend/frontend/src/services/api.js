import axios from "axios";

const API = axios.create({
    baseURL: "https://localhost:7205", // Your backend API URL
});

// Add a request interceptor to include the token in headers
API.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("authToken"); // Retrieve the JWT token
        if (token) {
            config.headers.Authorization = `Bearer ${token}`; // Set Authorization header
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default API;
