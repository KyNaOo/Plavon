import axios from 'axios';

const apiUrl = 'https://74ab-88-185-209-161.ngrok-free.app';

const api = axios.create({
    baseURL: apiUrl,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json, text/plain, */*',
    },
});

export default api;