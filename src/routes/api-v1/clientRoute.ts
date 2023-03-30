import { Router } from 'express';
import controller from '@controllers/Clients';
import asyncMiddleware from '@middleware/asyncHandler';
import { isAuthenticated } from '@middleware/isAuthenticated';
import { Schemas, ValidateSchema } from '@middleware/ValidateSchems';
const router = Router();

router.get(
  '/clients',
  isAuthenticated,
  asyncMiddleware(controller.getAllClients)
);
router.get(
  '/client/:id',
  isAuthenticated,
  asyncMiddleware(controller.getAClient)
);
router.post(
  '/client/',
  isAuthenticated,
  asyncMiddleware(controller.createAClient)
);
router.put(
  '/client/:id',
  isAuthenticated,
  asyncMiddleware(controller.updateClient)
);

router.delete(
  '/client/:id',
  isAuthenticated,
  asyncMiddleware(controller.deleteClient)
);
router.get(
  '/client-invoices/:id',
  isAuthenticated,
  asyncMiddleware(controller.getAClient)
);
export default router;
