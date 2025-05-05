import express from "express";
import { getFeeds, saveContent, reportContent } from "../controllers/feedController.js";
import authMiddleware from "../middleware/auth.js";

const feedRouter = express.Router();

feedRouter.get("/", authMiddleware, getFeeds);
feedRouter.post("/save", authMiddleware, saveContent);
feedRouter.post("/report", authMiddleware, reportContent);

export default feedRouter;