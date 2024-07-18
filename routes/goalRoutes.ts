import { Router } from "express";
import { createGoal } from "../controllers/goalControllers";
import { createMulter } from "../utils/utils";

const upload = createMulter("goals");

const goalRoutes = Router();

goalRoutes.route("/").post(upload.single("goal"), createGoal);

export default goalRoutes;
