import axios from 'axios';

const api = axios.create({
    // Use environmental variable for production, fallback to localhost for development
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
    timeout: 30000, // 30 seconds
});

// Add a request interceptor to include the auth token and school slug
api.interceptors.request.use(
    (config) => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user && user.token) {
            config.headers.Authorization = `Bearer ${user.token}`;
        }

        // Attempt to get school slug from URL if not already set
        const pathParts = window.location.pathname.split('/');
        // Ensure pathPart[1] is a valid slug (not superadmin or login)
        if (pathParts[1] && !['superadmin', 'login', ''].includes(pathParts[1])) {
            config.headers['x-school-slug'] = pathParts[1];
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add a response interceptor to handle global errors (e.g. 401 Unauthorized)
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            // Token expired or invalid
            localStorage.removeItem('user');
            // Optional: window.location.href = '/login'; 
        }
        return Promise.reject(error);
    }
);

export default api;
