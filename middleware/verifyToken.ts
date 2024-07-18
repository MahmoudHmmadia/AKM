import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { clientErrorResponse, serverErrorResponse } from "../utils/responses";
import { getToken } from "../utils/utils";

export default async function verifyToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const token = getToken(req);

    jwt.verify(token!, process.env.SECRET!, (err, authData) => {
      if (err) {
        return clientErrorResponse(
          res,
          {
            en: "session expired ! , login again",
            ar: "انتهت صلاحية الجلسة ، قم بتسجيل الدخول مجدداً",
          },
          403
        );
      } else {
        next();
      }
    });
  } catch (err) {
    return serverErrorResponse(res, err);
  }
}
