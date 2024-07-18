import { NextFunction, Request, Response } from "express";
import Account from "../models/Account";
import { clientErrorResponse, serverErrorResponse } from "../utils/responses";
import { getToken } from "../utils/utils";

export default async function checkActive(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const token = getToken(req);

    const account = await Account.findOne({ token });

    if (account?.active) {
      next();
    } else {
      return clientErrorResponse(
        res,
        {
          ar: "لم يتم تأكيد حسابك بعد",
          en: "Your account has not been confirmed yet",
        },
        401
      );
    }
  } catch (err) {
    return serverErrorResponse(res, err);
  }
}
