import axios from "axios";

export const api = axios.create({
    baseURL: 'http://localhost:5000/api',
    withCredentials: true
});

// api.defaults.headers.post['Content-Type'] = "application/json";