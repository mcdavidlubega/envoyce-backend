import { Router } from 'express';
import users from './userRoutes'
const baseRouter = Router();

baseRouter.use('/', users)

export default baseRouter;