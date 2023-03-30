import { Router } from 'express';
import users from './userRoutes';
import auth from './authRoutes';
import clients from './clientRoute';
import invoices from './invoiceRoute';
const baseRouter = Router();

baseRouter.use('/', users);
baseRouter.use('/', auth);
baseRouter.use('/', clients);
baseRouter.use('/', invoices);

export default baseRouter;
