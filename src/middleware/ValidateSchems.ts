import Joi, { ObjectSchema } from 'joi';
import { NextFunction, Request, Response } from 'express';
import loging from '@utils/loging';

export const ValidateSchema = (schema: ObjectSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validateAsync(req.body);
      next();
    } catch (error) {
      loging.error(error);
      return res.status(422).json({ error });
    }
  };
};

export const Schemas = {
  users: {
    create: Joi.object({
      email: Joi.string().max(50).email().required(),
      name: Joi.string(),
      role: Joi.string().valid('ADMIN', 'USER').required(),
      invoices: Joi.array().items(Joi.string().regex(/^[0-9a-fA-F]{24}$/)),
      profile: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
    }),
  },
};
