import { NextFunction, Request, Response } from "express";
import { Schema } from "yup";
import { serverErrorResponse } from "../utils/responses";

const validate =
  (schema: Schema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validate(req.body);
      return next();
    } catch (err) {
      return serverErrorResponse(res, err);
    }
  };

export default validate;
