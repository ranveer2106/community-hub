import express from "express";
import { earnCredits, spendCredits, getTransactionHistory } from "../controllers/creditController.js";
import authMiddleware from "../middleware/auth.js";

const creditRouter = express.Router();

creditRouter.post("/earn", authMiddleware, earnCredits);
creditRouter.post("/spend", authMiddleware, spendCredits);
creditRouter.post("/history", authMiddleware, getTransactionHistory);

export default creditRouter;