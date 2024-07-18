import { Router } from "express";
import {
  checkOtp,
  login,
  logout,
  register,
  resetPassword,
} from "../controllers/authController";
import checkFields from "../middleware/checkFields";
import isAdmin from "../middleware/isAdmin";
import validate from "../middleware/validate";
import { createMulter } from "../utils/utils";
import { registerUserSchema } from "../validator/userSchema";

const upload = createMulter("accounts");

const authRoutes = Router();

authRoutes.post(
  "/register",
  upload.single("profile"),
  validate(registerUserSchema),
  checkFields,
  register
);

authRoutes.post("/login", login);

authRoutes.post("/logout", logout);

authRoutes.post("/check-otp", checkOtp);

authRoutes.post("/reset-password", isAdmin, resetPassword);

export default authRoutes;
