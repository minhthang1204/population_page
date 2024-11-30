import axios from 'axios';
import { BASE_URL } from './apiConfig';


const axiosInstance = axios.create({
  baseURL: BASE_URL || 'https://api.example.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
