import { Router } from 'express';
import controller from '@controllers/Invoices';
import asyncMiddleware from '@middleware/asyncHandler';
import { isAuthenticated } from '@middleware/isAuthenticated';
import { Schemas, ValidateSchema } from '@middleware/ValidateSchems';

const router = Router();

router.get(
  '/invoices',
  isAuthenticated,
  asyncMiddleware(controller.getAllInvoices)
);
router.get(
  '/invoices/:id',
  isAuthenticated,
  asyncMiddleware(controller.getClientInvoices)
);
router.get(
  '/invoice/:id',
  isAuthenticated,
  asyncMiddleware(controller.getInvoice)
);
router.post('/invoice/', isAuthenticated, controller.createInvoice);
router.put(
  '/invoice/:id',
  isAuthenticated,
  asyncMiddleware(controller.updateInvoice)
);

router.delete(
  '/invoice/:id',
  isAuthenticated,
  asyncMiddleware(controller.deteleteInvoice)
);
router.post(
  '/invoice/:inid/item',
  isAuthenticated,
  asyncMiddleware(controller.addItem)
);
router.put(
  '/invoice/:inid/item/:itid',
  isAuthenticated,
  asyncMiddleware(controller.editItem)
);
router.delete(
  '/invoice/:inid/item/:itid',
  isAuthenticated,
  asyncMiddleware(controller.deleteItem)
);

router.post(
  '/invoice/:inid/addon',
  isAuthenticated,
  asyncMiddleware(controller.createAddon)
);
router.put(
  '/invoice/:inid/addon/:aoid',
  isAuthenticated,
  asyncMiddleware(controller.updateAddon)
);
router.delete(
  '/invoice/:inid/addon/:aoid',
  isAuthenticated,
  asyncMiddleware(controller.deleteAddOn)
);

export default router;
