import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000',
});

// Interceptor untuk menyisipkan token ke setiap request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor untuk merapikan response sesuai format global backend (status, statusCode, message, data)
api.interceptors.response.use(
  (response) => {
    // Jika formatnya adalah wrapper custom backend, langsung ambil isi 'data'-nya
    if (response.data && response.data.status === true && response.data.data !== undefined) {
      response.data = response.data.data;
    }
    return response;
  },
  (error) => Promise.reject(error)
);

export default api;
