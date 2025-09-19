import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const BASE_API_URL = process.env.EXPO_PUBLIC_BASE_API_URL || 'http://10.0.2.2:3000/api';
const axiosInstance = axios.create({
  baseURL: BASE_API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    // 'Authorization': `Bearer ${AsyncStorage.getItem('token') || ''}`,
  },
});

axiosInstance.interceptors.request.use(
  async (config) => {
    console.log('Request made with ', config);
    const token = await AsyncStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    console.log('Request headers:', config.headers);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Handle unauthorized access, e.g., redirect to login
      console.error('Unauthorized access - redirecting to login');
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
