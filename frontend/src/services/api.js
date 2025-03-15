import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

// Change this to your actual server address
// When testing on physical devices, use your computer's IP address
const API_URL = 'http://10.0.2.2:5000/api'; // For Android emulator
// const API_URL = 'http://localhost:5000/api'; // For iOS simulator

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to add auth token to requests
api.interceptors.request.use(
  async (config) => {
    const token = await SecureStore.getItemAsync('userToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// User API calls
export const loginUser = async (email, password) => {
  try {
    const response = await api.post('/users/login', { email, password });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Something went wrong';
  }
};

export const registerUser = async (username, email, password) => {
  try {
    const response = await api.post('/users', { username, email, password });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Something went wrong';
  }
};

export const getUserProfile = async () => {
  try {
    const response = await api.get('/users/profile');
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Something went wrong';
  }
};

// Challenge API calls (add these later when implementing backend)
export const submitChallenge = async (challengeType, image) => {
  try {
    const formData = new FormData();
    formData.append('challengeType', challengeType);
    formData.append('image', {
      uri: image,
      type: 'image/jpeg',
      name: 'challenge.jpg',
    });

    const response = await api.post('/challenges', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Something went wrong';
  }
};

export default api;