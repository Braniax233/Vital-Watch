import axios from 'axios';
import { getAuth } from 'firebase/auth';

// Use the development machine's IP address for React Native
const API_BASE_URL = 'http://192.168.137.1:3000';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the auth token
api.interceptors.request.use(
  async (config) => {
    const auth = getAuth();
    const user = auth.currentUser;
    
    if (user) {
      const token = await user.getIdToken();
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const fetchLatestVitals = async () => {
  try {
    const response = await api.get('/vitals');
    return response.data;
  } catch (error) {
    console.error('Error fetching vitals:', error);
    throw error;
  }
};

export const fetchUserVitals = async (userId) => {
  try {
    const response = await api.get(`/vitals/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user vitals:', error);
    throw error;
  }
};

export const checkApiHealth = async () => {
  try {
    const response = await api.get('/health');
    return response.data;
  } catch (error) {
    console.error('Error checking API health:', error);
    throw error;
  }
};