import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from 'cors';
import postRouter from "./routes/post.js";
import userRouter from './routes/user.js';
import dotenv from "dotenv";

// =================================================//
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// ================================================//

const app = express();
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
dotenv.config();


app.use('/api/posts', postRouter);
app.use('/api/users', userRouter);
// const CONNECTION_URL = 'mongodb://localhost:27017/memories';process.env.CONNECTION_URL

const PORT = process.env.PORT || 9000;

// ==============================================================//
// make frontend folder to static :
app.use(express.static(path.join(__dirname, '/../client/build')));

// also make the index.html as starting file:
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/../client/build/index.html'));
});

// ===============================================================//


mongoose.connect(process.env.CONNECTION_URL)
    .then(() => {
        console.log('connected to mongodb');
        app.listen(PORT, () => {
            console.log(`server is running at: http://localhost:${PORT}`)
        })
    })
    .catch((error) => {
        console.log('error is: ', error.message)
    });



