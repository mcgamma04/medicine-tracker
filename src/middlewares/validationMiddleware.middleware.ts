import { ValidationError, validate } from "class-validator";
import { NextFunction,Request,Response } from "express";

export const validationMiddleware = (type: any) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const errors: ValidationError[] = await validate(
      Object.assign(new type(), req.body)
    );

    if (errors.length > 0) {
      res.status(400).json(errors);
    } else {
      next();
    }
  };
};
