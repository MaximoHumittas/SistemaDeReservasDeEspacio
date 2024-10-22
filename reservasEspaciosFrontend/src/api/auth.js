import axios from 'axios';

const API = 'http://localhost:3000/api';  // Cambia la ruta para que coincida con tu backend

// Función para hacer una reserva
export const reserveRequest = async (data) => { 
    try {
        const { usuario_id, recurso_id, fecha, hora_inicio, hora_fin } = data;
        console.log("Datos para la reserva: ", data);

        const response = await axios.post(`${API}/haceReserva`, {
            usuario_id,
            recurso_id,
            fecha,
            hora_inicio,
            hora_fin
        });

        console.log("Reserva realizada:", response.data);
        return response.data;  // Devuelve la respuesta del backend
    } catch (error) {
        console.error("Error al hacer la solicitud de reserva:", error);
        throw error;  
    }
};

// Función para obtener los recursos por tipo (cubículo, biblioteca, etc.)
export const resourceRequest = async (typeResource) => {
    try {
        const response = await axios.get(`${API}/obtenerRecurso`, {
            params: { type: typeResource }
        });
        console.log("Recursos obtenidos:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error al obtener los recursos:", error);
        throw error;
    }
};

// Función para obtener los horarios de un recurso en una fecha específica
export const hoursRequest = async (recurso_id, fecha) => {
    try {
        console.log("Obteniendo horarios para el recurso:", recurso_id, " en la fecha:", fecha);

        const response = await axios.get(`${API}/obtenerHorario`, {
            params: { recurso_id, date: fecha }
        });

        console.log("Horarios obtenidos:", response.data);
        return response.data;  
    } catch (error) {
        console.error("Error al obtener los horarios:", error);
        return null; 
    }
};

// Función para obtener el ID de un usuario por su email
export const getUserId = async (email) => {
    try {
        console.log("Buscando ID del usuario con email:", email);

        const response = await axios.get(`${API}/getId/${email}`);

        console.log("ID del usuario obtenido:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error al obtener el ID del usuario:", error);
        return null;
    }
};

// Función de registro (no utilizada en este caso)
export const register = async (data) => {
    console.log("Datos para el registro:", data);
};
