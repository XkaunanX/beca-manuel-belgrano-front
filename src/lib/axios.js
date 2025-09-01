import axios from "axios";

// Se crea una instancia personalizada de axios para reutilizar configuraciones globales
const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL, // Se toma la URL base desde las variables de entorno
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers = {
                ...config.headers,
                Authorization: `Bearer ${token}`,
            };
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;