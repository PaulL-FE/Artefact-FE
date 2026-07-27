import axios from 'axios';

const API_URL = `${process.env.REACT_APP_BASE_URL}/api`;

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'accept': 'application/json',
    }
});

export default api;