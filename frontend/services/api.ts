import axios from 'axios';

const apiUrl = process.env.EXPO_PUBLIC_API_URL;

const api = axios.create({
    baseURL: apiUrl,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json, text/plain, */*',
    },
});

export default api;