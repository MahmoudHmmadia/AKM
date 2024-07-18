import { NextFunction, Request, Response } from "express";
import User from "../models/Account";
import {
  clientErrorResponse,
  NO_PERMISSIONS_MESSAGE,
  serverErrorResponse,
} from "../utils/responses";
import { getToken } from "../utils/utils";

export default async function isAdmin(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const token = getToken(req);

    const user = await User.findOne({ token, role: "ADMIN" });

    if (user) {
      next();
    } else {
      return clientErrorResponse(res, NO_PERMISSIONS_MESSAGE, 401);
    }
  } catch (err) {
    return serverErrorResponse(res, err);
  }
}
