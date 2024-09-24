import {Router} from 'express'
import { login,reserve,getResource } from '../controllers/auth.controller.js'

//en proceso
const router = Router()

router.post('/reserve',reserve)

router.post('/login', login)

router.get('/getResource/:resourceType', getResource)


export default router