import { Request, Response } from "express";
import Goal from "../models/Goal";
import {
  CREATED_DATA_MESSAGE,
  serverErrorResponse,
  successResponse,
} from "../utils/responses";

export async function createGoal(req: Request, res: Response) {
  try {
    const { name, type, target, description } = req.body;
    const goal = await Goal.create({
      name,
      type,
      target,
      description,
      image: req.file
        ? process.env.IMAGES_URL + "/goals" + req.file?.filename
        : "",
    });
    return successResponse(res, { goal, ...CREATED_DATA_MESSAGE });
  } catch (err) {
    serverErrorResponse(res, err);
  }
}
