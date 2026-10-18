import axios from 'axios';

const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
});

// Unwrap the body on success, and normalize errors to { status, message, errors }
client.interceptors.response.use(
  (response) => response.data,
  (error) =>
    Promise.reject({
      status: error.response?.status,
      message: error.response?.data?.message || error.message || 'Network error',
      errors: error.response?.data?.errors ?? [],
    })
);

export default client;
