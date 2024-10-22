import { Router } from 'express';
import { haceRecurso, haceReserva, obtenerHorario, obtenerRecurso, getId, eliminarReserva } from '../controllers/api.controller.js';

const api = Router();

// Rutas para la API
api.post('/haceReserva', haceReserva);
api.post('/haceRecurso', haceRecurso);
api.get('/obtenerHorario', obtenerHorario);
api.get('/obtenerRecurso', obtenerRecurso);
api.get('/getId/:email', getId);
api.delete('/eliminarReserva', eliminarReserva);  // Nueva ruta para eliminar reservas

export default api;
