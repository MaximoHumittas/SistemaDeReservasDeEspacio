import {Router} from 'express'
import {reserve, login, getResource, getHorary} from '../controllers/auth.controller.js'

const router = Router()

// Rutas para la API
router.post('/reserve/:resourceId/:date/:hour', reserve);
router.post('/login', login);
router.get('/getResource/:resourceType/', getResource);
router.get('/getHorary/:id/:date', getHorary);

export default router;