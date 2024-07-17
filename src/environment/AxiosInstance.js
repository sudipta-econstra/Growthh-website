import axios from 'axios';

module.exports = axios.create({
    baseURL: "https://api.growthh.in/api/",
    headers: {
        'Content-Type': 'application/json',
    },
})