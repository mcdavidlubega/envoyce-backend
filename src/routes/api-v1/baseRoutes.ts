import { Router } from 'express';
import users from './userRoutes';
import auth from './authRoutes';
const baseRouter = Router();

baseRouter.use('/', users);
baseRouter.use('/', auth);

export default baseRouter;
