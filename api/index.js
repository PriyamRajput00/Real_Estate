import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import listingRouter from './routes/listing.route.js';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';

// Load environment variables
dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO).then(() => {
  console.log('✅ Connected to MongoDB!');
}).catch((err) => {
  console.error('❌ Error connecting to MongoDB:', err);
});

// Define __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Express app
const app = express();

// Core middleware
app.use(express.json());
app.use(cookieParser());

// API routes
app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/listing', listingRouter);


// --- Production Setup: Serve React Frontend ---

// 1. Define the path to the built frontend
const distPath = path.join(__dirname, '../client/dist');

// 2. Serve static files (JS, CSS, images) from the React app's build directory
app.use(express.static(distPath));

// 3. "Catch-all" middleware: For any request that doesn't match the above,
//    send back the main index.html file.
app.use((req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

// --- End of Production Setup ---


// Error handling middleware (must be the last app.use() call)
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});