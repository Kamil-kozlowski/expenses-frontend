import axios from "axios";

export default (authService) => {
    const SERVER_URL = 'http://localhost:8080';
    const TOKEN = 'token';

    const axiosInstance = axios.create({
        baseURL: SERVER_URL
    });

    axiosInstance.interceptors.request.use(
        config => {
            const token = localStorage.getItem(TOKEN);
            if (token) {
                config.headers['Authorization'] = `Bearer ${token}`;
            }
            return config;
        },
        error => Promise.reject(error)
    );

    axiosInstance.interceptors.response.use(
        (response) => response,
        error => {
            console.log(error.response.status);
            if (error.response.status === 401) {
                if (authService) authService.logOut()
            }
            return Promise.reject(error);
        }
    );

    return axiosInstance;
}