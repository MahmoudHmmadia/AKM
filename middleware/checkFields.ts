import { NextFunction, Request, Response } from "express";
import {
  clientErrorResponse,
  NO_PERMISSIONS_MESSAGE,
  serverErrorResponse,
} from "../utils/responses";

export default async function checkFields(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { role } = req.body;

    let requiredFields: string[] = [];

    if (role == "CUSTOMER") {
      return clientErrorResponse(res, NO_PERMISSIONS_MESSAGE, 401);
    } else if (role == "BUSINESS") {
      requiredFields = [
        "category",
        "address",
        "operatingHours",
        "phoneNumber",
        "email",
        "name",
      ];
    } else if (role == "STAFF") {
      requiredFields = ["goals", "business"];
    }

    for (let i = 0; i < requiredFields.length; i++) {
      if (!req.body[requiredFields[i]]) {
        return clientErrorResponse(res, {
          ar: `تأكد من ارسال كامل المعلومات`,
          en: `make sure to send all information`,
        });
      }
    }
    next();
  } catch (err) {
    return serverErrorResponse(res, err);
  }
}
