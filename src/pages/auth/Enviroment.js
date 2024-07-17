import axios from 'axios';

export const Axios = axios.create({
    baseURL: "https://api.growthh.in/api/",
    headers: {
        'Content-Type': 'application/json',
    },
})

// http://13.233.238.6:8000/