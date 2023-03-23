import { Router } from 'express';
import users from './users'
const baseRouter = Router();

baseRouter.use('/', users)

export default baseRouter;