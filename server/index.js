import express from "express";
import dotenv from 'dotenv';
import cors from "cors";

import connectDB from "./mongodb/connect.js";
import dalleRoutes from "./routes/dalleRoutes.js";
import postRoutes from "./routes/postRoutes.js";


dotenv.config();

const app = express();
app.use(cors());

app.use(express.json({ limit: '50mb' }));

app.use('./api/v1/post', postRoutes);
app.use('./api/v1/dalle', dalleRoutes);

app.get('/', async (req, res) => {
    res.send('This is Dall-E');
});

const startServer = async () => {
    try {
        console.log("Mongo URL:", process.env.MONGODB_URL);
        connectDB(process.env.MONGODB_URL);
        app.listen(8080, () => console.log("Server running on https://localhost:8080"));
    } catch (error) {
        console.error("Error starting the server:", error);
    }
};
startServer();
