import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000',
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
        if (pathParts[1] && pathParts[1] !== 'superadmin' && pathParts[1] !== 'login') {
            config.headers['x-school-slug'] = pathParts[1];
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;
