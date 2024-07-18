import { Router } from "express";
import { editAccount } from "../controllers/accountController";
import checkActive from "../middleware/checkActive";
import removeImage from "../middleware/removeImage";
import { createMulter } from "../utils/utils";

const upload = createMulter("accounts");

const accountRoutes = Router();

accountRoutes
  .route("/")
  .patch(upload.single("profile"), checkActive, removeImage, editAccount);

export default accountRoutes;
