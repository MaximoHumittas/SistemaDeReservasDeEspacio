import {Router} from 'express'
import { login,reserve,getResource,getHorary } from '../controllers/auth.controller.js'

//en proceso
const router = Router()

router.post('/reserve/:resourceId/:date/:hour',reserve)

router.post('/login', login)

router.get('/getResource/:resourceType/', getResource)

router.get('/getHorary/:id/:date',getHorary)


export default router