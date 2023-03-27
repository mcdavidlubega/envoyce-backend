import {Router} from 'express'
import controller from '@controllers/Users'
import asyncMiddleware from '@middleware/asyncHandler'
import { Schemas, ValidateSchema } from '@middleware/ValidateSchems'
const router = Router()


router.get('/users', asyncMiddleware (controller.getAllUsers))
router.get('/user/:id', asyncMiddleware(controller.getAUser))
router.post('/user/', asyncMiddleware(controller.createUser))
router.put('/user/:id', asyncMiddleware(controller.updateUser))
router.put('/user/:id/role', asyncMiddleware(controller.updateUserRole))
router.delete('/user/:id', asyncMiddleware(controller.deleteUser))

export default router