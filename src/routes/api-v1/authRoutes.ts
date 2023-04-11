import { Router } from 'express';
import controller from '@controllers/Auth';
import asyncMiddleware from '@middleware/asyncHandler';
const router = Router();

router.post('/auth/login', asyncMiddleware(controller.login));

export default router;
