import axios from 'axios';

const api = axios.create({
    baseURL: 'http://githubstars-backend.herokuapp.com',
});

export default api;
