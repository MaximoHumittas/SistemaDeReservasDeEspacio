import {Router} from 'express'
import {reserve, login, getResource, getHorary, getId} from '../controllers/auth.controller.js'

const router = Router()

// Rutas para la API
router.post('/reserve/:idUser/:resourceId/:date/:hour', reserve);
router.post('/login', login);
router.get('/getResource/:resourceType/', getResource);
router.get('/getHorary/:id/:date', getHorary);
router.get('/getId/:email', getId)

export default router;