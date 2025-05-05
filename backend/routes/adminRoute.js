import express from "express";
import { getReports, manageUsers, getStats } from "../controllers/adminController.js";
import authMiddleware from "../middleware/auth.js";

const adminRouter = express.Router();

adminRouter.get("/reports", authMiddleware, getReports);
adminRouter.get("/users", authMiddleware, manageUsers);
adminRouter.get("/stats", authMiddleware, getStats);

export default adminRouter;