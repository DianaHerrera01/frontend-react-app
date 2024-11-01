import axios from 'axios';

// Crear una instancia de axios
const api = axios.create({
    baseURL: 'http://localhost:8001',
});

// Configurar interceptores para manejar respuestas y errores
api.interceptors.response.use(
    response => response,
    error => {
        // Manejo de errores globales
        console.error('Error en la respuesta de la API:', error);
        return Promise.reject(error);
    }
);

export default api;
