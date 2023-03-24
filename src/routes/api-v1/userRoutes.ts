import {Router} from 'express'
import controller from '@controllers/Users'
const router = Router()


router.post('/users', controller.createUser)
router.get('/users', controller.getAllUsers)


export default router