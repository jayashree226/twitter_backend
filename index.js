import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import morgan from 'morgan';
import tweetsRouter from './routes/tweets.js';


// env variables && connect to MongoDB
dotenv.config();
mongoose.connect(process.env.ATLAS_URI);

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(morgan("dev"))
app.use(express.json());
app.use('/tweets', tweetsRouter);

app.get('/', (req, res) => {
    res.send('Welcome to the API!');
});



app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));