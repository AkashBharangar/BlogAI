import express from "express";
import dotenv from "dotenv";
import connectDB from "./database/db.js";
import userRoute from "./routes/user.route.js";
import blogRoute from "./routes/blog.route.js";
import commentRoute from "./routes/comment.route.js";
import aiRoute from "./routes/ai.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();
const app = express();

const PORT = process.env.PORT || 3000;

// middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// CORS
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  })
);

// APIs
app.use("/api/v1/user", userRoute);
app.use("/api/v1/blog", blogRoute);
app.use("/api/v1/comment", commentRoute);
app.use("/api/v1/ai", aiRoute);

// connect DB and start server
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database connection failed", err);
    process.exit(1);
  });
