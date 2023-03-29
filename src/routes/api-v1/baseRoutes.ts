import { Router } from 'express';
import users from './userRoutes';
import auth from './authRoutes';
import clients from './clientRoute';
const baseRouter = Router();

baseRouter.use('/', users);
baseRouter.use('/', auth);
baseRouter.use('/', clients);

export default baseRouter;
