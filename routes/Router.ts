import { Express } from "express";
import verifyToken from "../middleware/verifyToken";
import accountRoutes from "./accountRoutes";
import authRoutes from "./authRoutes";
import goalRoutes from "./goalRoutes";

function router(server: Express) {
  server.use("/api/auth", authRoutes);

  server.use("/api/goals", goalRoutes);

  server.use("/api/accounts", verifyToken, accountRoutes);
}

export default router;
