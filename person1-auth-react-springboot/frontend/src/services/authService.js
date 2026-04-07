import axios from 'axios';

const API_BASE_URL = 'http://localhost:8081/api/auth';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add authorization token to requests
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const authService = {
  register: (userData) => apiClient.post('/register', userData),
  login: (email, password, role) => apiClient.post('/login', { email, password, role }),
  getProfile: () => apiClient.get('/profile'),
  updateProfile: (name) => apiClient.put('/profile', { name }),
  logout: () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  }
};

export default apiClient;
