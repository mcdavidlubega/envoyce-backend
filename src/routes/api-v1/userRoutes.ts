import { Router } from 'express';
import controller from '@controllers/Users';
import asyncMiddleware from '@middleware/asyncHandler';
import { isAuthenticated } from '@middleware/isAuthenticated';
import { Schemas, ValidateSchema } from '@middleware/ValidateSchems';
const router = Router();

router.get('/users', asyncMiddleware(controller.getAllUsers));
router.get('/user/:id', asyncMiddleware(controller.getAUser));
router.post('/user/', isAuthenticated, asyncMiddleware(controller.createUser));
router.put(
  '/user/:id',
  isAuthenticated,
  asyncMiddleware(controller.updateUser)
);
router.put(
  '/user/:id/role',
  isAuthenticated,
  asyncMiddleware(controller.updateUserRole)
);
router.delete(
  '/user/:id',
  isAuthenticated,
  asyncMiddleware(controller.deleteUser)
);

export default router;
