import { Router } from "express";
import {
  checkOtp,
  completeCustomerRegister,
  customerRegister,
  login,
  logout,
  newCode,
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

authRoutes.post("/customer-register", customerRegister);

authRoutes.post(
  "/complete-customer-register",
  validate(registerUserSchema),
  completeCustomerRegister
);

authRoutes.post("/login", login);

authRoutes.post("/logout", logout);

authRoutes.post("/check-otp", checkOtp);

authRoutes.post("/reset-password", isAdmin, resetPassword);

authRoutes.post("new-otp", newCode);

export default authRoutes;
