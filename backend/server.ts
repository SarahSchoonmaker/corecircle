import express, { Application } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import authRoutes from './routes/auth.routes.js';
import profileRoutes from './routes/profile.routes.js';
import friendRoutes from './routes/friends.routes.js';
import messageRoutes from './routes/messages.routes.js';


dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI as string;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/friends', friendRoutes);
app.use('/api/messages', messageRoutes);

mongoose
  .connect(MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`✅ Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
  });
