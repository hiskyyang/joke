import "dotenv/config";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";


const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send({message: "Hello World!"});
});

import apiRoutes from "./routes/api.js";
app.use("/api", apiRoutes);

await mongoose.connect(process.env.DB_CONNECTION_STRING);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});