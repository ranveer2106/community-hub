// import express from "express";
// import { getFeeds, saveContent, reportContent } from "../controllers/feedController.js";
// import authMiddleware from "../middleware/auth.js";

// const feedRouter = express.Router();

// feedRouter.get("/", authMiddleware, getFeeds);
// feedRouter.post("/save", authMiddleware, saveContent);
// feedRouter.post("/report", authMiddleware, reportContent);

// export default feedRouter;

// import express from "express";
// import { getFeeds } from "../controllers/feedController.js";

// const feedRouter = express.Router();

// feedRouter.get("/", getFeeds);

// export default feedRouter;


// filepath: f:\tharun project\backend\routes\feedRoute.js
import express from "express";
import { fetchRedditPosts } from "../reddit-fetch.js";

const feedRouter = express.Router();

// Proxy endpoint for Reddit API
feedRouter.get("/", async (req, res) => {
    try {
        const feeds = await fetchRedditPosts();
        res.json({ success: true, feeds });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

export default feedRouter;
