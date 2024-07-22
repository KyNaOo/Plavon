import axios from 'axios';

const apiUrl = `https://192.168.1.152:3000`

const api = axios.create({
    baseURL: apiUrl,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;