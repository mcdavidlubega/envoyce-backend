import { Router } from 'express';
import baseRouter from './api-v1/baseRoutes'

const apiVersionRouter = Router();
apiVersionRouter.use('/api-v1', baseRouter)

export default apiVersionRouter;
