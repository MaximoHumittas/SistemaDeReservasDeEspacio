import {Router} from 'express'
import { haceRecurso, haceReserva, obtenerHorario, obtenerRecurso } from '../controllers/api.controller.js';

const api = Router()

// Rutas para la API
api.post('/haceReserva', haceReserva);
api.post('/haceRecurso', haceRecurso);
api.get('/obtenerHorario', obtenerHorario);
api.get('/obtenerRecurso', obtenerRecurso);

export default api;