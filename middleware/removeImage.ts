import { NextFunction, Request, Response } from "express";
import { existsSync, unlink } from "fs";
import { join } from "path";
import User from "../models/Account";
import { DIRNAME } from "../server";
import {
  clientErrorResponse,
  NOT_FOUND_DATA_MESSAGE,
  serverErrorResponse,
} from "../utils/responses";
import { getToken } from "../utils/utils";

export default async function removeImage(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const token = getToken(req);

    const user = await User.findOne({ token });

    if (!user) {
      return clientErrorResponse(res, NOT_FOUND_DATA_MESSAGE);
    }
    if (!user.profile) {
      return next();
    }
    if (req.file) {
      const path = join(
        DIRNAME,
        "public",
        "images",
        "profiles",
        user.profile?.split("/")[6]
      );
      if (existsSync(path)) {
        unlink(path, (err) => {
          if (err) {
            return serverErrorResponse(res, err);
          }
        });
      }
      user.profile = "";
      await user.save();
    }

    return next();
  } catch (err) {
    return serverErrorResponse(res, err);
  }
}
