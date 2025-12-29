import axios from "axios";

const api = axios.create({
    baseURL: "https://task-management-system-lf94.onrender.com", // your backend
    withCredentials: true
});

export default api;
