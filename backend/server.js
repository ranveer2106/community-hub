import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import userRouter from "./routes/userRoute.js";
import feedRouter from "./routes/feedRoute.js";
import creditRouter from "./routes/creditRoute.js";

import 'dotenv/config';

// App config
const app = express();
const port = 4000;

// Middleware
app.use(express.json());
app.use(cors());

// DB connection
connectDB();

// API Endpoints
app.use("/api/user", userRouter);
app.use("/api/feed", feedRouter);
app.use("/api/credits", creditRouter);

app.get("/", (req, res) => {
    res.send("API Working");
});

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});