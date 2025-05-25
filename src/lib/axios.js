import axios from "axios";

// se crea una instancia personalizada de axios para reutilizar configuraciones globales
const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL, // se toma la URL base desde las variables de entorno
    headers: {
        "X-Requested-With": "XMLHttpRequest" // cabecera que indica que la solicitud fue hecha via AJAX
    },
    withCredentials: true // permite el envio de cookies y credenciales entre dominios
});

export default axiosInstance;