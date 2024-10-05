import {Router} from 'express'
import { register } from '../controllers/auth.controller.js'

//en proceso
const router = Router()

router.post('/router',register)

router.post('/login')

export default router