import {Request, Response, NextFunction} from 'express'
export default function asyncMiddleware(handler:any) {
    return async (req:Request, res:Response, next:NextFunction) => {
      try {
        await handler(req, res);
      } catch (err) {
        next(err);
      }
    };
  }