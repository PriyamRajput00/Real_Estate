import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import listingRouter from "./routes/listing.route.js";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";

// Configure environment
dotenv.config();

// MongoDB connection
mongoose
  .connect(process.env.MONGO)
  .then(() => console.log("✅ Connected to MongoDB!"))
  .catch((err) => console.error("❌ Error connecting to MongoDB:", err));

// Resolve __dirname (for ES modules)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize express app
const app = express();
app.use(express.json());
app.use(cookieParser());

// API routes
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/listing", listingRouter);

// Serve frontend build (React + Vite)
const distPath = path.join(__dirname, "../client/dist");
app.use(express.static(distPath));


// Catch-all route for React router
app.use((req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});


// Error handling middleware (always last)
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

// Server listener
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
