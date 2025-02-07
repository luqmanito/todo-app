import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://192.168.20.235:3239/api/v1', // Replace with your API URL
  headers: {
    'Content-Type': 'application/json',
    // Access localStorage only on the client side
    Authorization: typeof window !== 'undefined' && localStorage.getItem('token') 
      ? `Bearer ${localStorage.getItem('token')}`
      : '',
  },
});

export default axiosInstance;
