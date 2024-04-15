import dotenv from 'dotenv';
dotenv.config();

import express, { Express } from 'express';
const app: Express = express();

import cors from 'cors';
import corsOptions from './config/corsOptions';

import connectDB from './config/dbConn';
import mongoose from 'mongoose';

import rootRouter from './routes/root';

const PORT: number | string = process.env.PORT || 3500;

connectDB();

app.use(express.json());
app.use(express.static('public'));
app.use(cors(corsOptions));

app.use('/', rootRouter);

app.use('*', (req, res) => {
    res.status(404);
    if (req.accepts('json'))
        res.json({ message: '404 Not Found!' });
    else
        res.type('txt').send('404 Not Found!');
});

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}!`));
});

mongoose.connection.on('error', err => {
    console.log(err);
});
