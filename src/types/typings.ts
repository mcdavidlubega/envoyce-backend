import * as express from "express"
import { Users } from '@prisma/client'

export {}
declare global {
  namespace Express {
    interface Request {
      user?: Users;
    }
  }
}