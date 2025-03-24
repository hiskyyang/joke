import "dotenv/config";
import mongoose from "mongoose";
import DadJoke from "../data/schema.js";

await mongoose.connect(process.env.DB_CONNECTION_STRING);
console.log("Connected to database");

await DadJoke.deleteMany({});

const jokes = [
    {joke:"I'm reading a book on the history of glue. I just can't seem to put it down."},
    {joke:"Why couldn't the bicycle find its way home? It lost its bearings."},
    {joke:"I told my wife she should embrace her mistakes. She gave me a hug."},
    {joke:"I'm terrified of elevators, so I'm going to start taking steps to avoid them."},
    {joke:"I used to play piano by ear, but now I use my hands and fingers."},
    {joke:"I'm reading a book on the history of glue. I just can't seem to put it down."}, 
    {joke:"I'm terrified of elevators, so I'm going to start taking steps to avoid them."}     
];

const response = await DadJoke.insertMany(jokes);
console.log(`Inserted ${response.length} jokes into the database`);

await mongoose.disconnect();
console.log("Disconnected from database");