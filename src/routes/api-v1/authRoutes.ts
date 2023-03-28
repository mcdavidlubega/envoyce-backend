import { Router } from 'express';
import controller from '@controllers/Auth';
import asyncMiddleware from '@middleware/asyncHandler';
const router = Router();

router.post('/auth/login', asyncMiddleware(controller.login));
router.post('/auth/signup', asyncMiddleware(controller.signup));

export default router;
