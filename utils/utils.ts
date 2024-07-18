import { Request } from "express";
import { Model } from "mongoose";
import multer, { diskStorage } from "multer";
import { join } from "path";
import { DIRNAME } from "../server";

export function getToken(req: Request) {
  const bearerHeader = req.headers["authorization"];

  const token = bearerHeader?.split(" ")[1];

  return token;
}

export async function paginate(
  req: Request,
  model: Model<any>,
  query?: any,
  populate?: string
) {
  const page = parseInt(req.query.page?.toString()!);

  const totalCount = (await model.find(query ? query : {})).length;

  const pagesNumber = Math.ceil(totalCount / 10);

  const startIndex = ((page ? page : 1) - 1) * 10;

  const data = await model
    .find(query)
    .skip(startIndex)
    .limit(10)
    .sort({ _id: -1 })
    .populate(populate ? populate : "");
  return { data, pagesNumber, totalCount };
}

export function createMulter(dir: string) {
  const storage = diskStorage({
    destination(_req, _file, callback) {
      callback(null, join(DIRNAME, "public", "images", dir));
    },

    filename(_req, file, callback) {
      callback(null, file.originalname);
    },
  });

  const upload = multer({ storage });
  return upload;
}
