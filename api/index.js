import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

console.log('1. Core imports loaded');

import userRouter from './routes/user.route.js';
console.log('2. User router imported');

import authRouter from './routes/auth.route.js';
console.log('3. Auth router imported');

import listingRouter from './routes/listing.route.js';
console.log('4. Listing router imported');

import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

console.log('5. All imports successful');

dotenv.config();

mongoose.connect(process.env.MONGO).then(() => {
  console.log('Connected to MongoDB!');
}).catch((err) => {
  console.error('Error connecting to MongoDB', err);
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/listing', listingRouter);

// Serve static files from the React app build directory
app.use(express.static(path.join(__dirname, '../client/dist')));

// Catch all handler: send back React's index.html file for any non-API routes
app.use((req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

// Middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});