// Import Packages
import express, { Request, Response } from "express";
import dotenv from "dotenv";
import path from 'path'

//Initilaize configuration using env file
dotenv.config({path : path.resolve("../../.env")});

// Initial app
const HOST = process.env.HOST;
const PORT = parseInt(process.env.SERVER_PORT as string) || 8080;
console.log(PORT);
const APP = express();

const NODE_ENV = process.env.NODE_ENV;
console.log(NODE_ENV);

// Home Route
APP.get("/", (req : Request, res:Response)=>{
    res.json({
        host : "Fashion Store",
        repoUrl : "https://github.com/ashutoshpaliwal26/fashion-store",
        ownedBy : "Ashutosh Paliwal",
        licence : "MIT Licence",
        type : "SERVER",
        status : "RUNNING",
        success : "TRUE",
    })
})

// Environment
if (NODE_ENV === "development") {
  console.log(`
        Dev Server is Running on : http://localhost:${PORT}
        Host Server is Running on : http://${HOST}:${PORT}
    `);
} else {
  console.log("PRODUCTION SERVER RUNNING");
}

//Listning App
APP.listen(PORT, "0.0.0.0", () => console.log("|--- RUNNING ----|"));
