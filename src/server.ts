import dotenv from 'dotenv';
dotenv.config();

import express, { Express } from 'express';
const app: Express = express();

import cors from 'cors';
import corsOptions from './config/corsOptions';

import connectDB from './config/dbConn';
import mongoose from 'mongoose';

import userRouter from './routes/users';
import authRouter from './routes/auth';

const PORT: number | string = process.env.PORT || 3500;

// Establishing Connection to MongoDB
connectDB();

// Middlewares
app.use(express.json());
app.use(cors(corsOptions));

// Routes
app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}!`));
});

mongoose.connection.on('error', err => {
    console.log(err);
});
