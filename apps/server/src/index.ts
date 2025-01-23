import dotenv from "dotenv";
dotenv.config();
// Import Packages
import express, { Request, Response } from "express";
import ConnectToDB from "./config/db";
import authRouter from "./routes/auth";
import cors from 'cors';
import productRoute from "./routes/product";

//Initilaize configuration using env file

// DB Connections
const DB_STR = process.env.DB_STR as string;
ConnectToDB(DB_STR);


// Initial app
const HOST = process.env.HOST || "0.0.0.0";
const PORT = parseInt(process.env.SERVER_PORT as string) || 8080;
export const SEC = process.env.JWT_SEC as string;
const APP = express();

// Vaidators
APP.use(express.json());
APP.use(cors())


const NODE_ENV = process.env.NODE_ENV;

// Rest API
APP.use("/api", authRouter);
APP.use("/api", productRoute);

// Home Route
APP.get("/", (req: Request, res: Response) => {
  res.json({
    host: "Fashion Store",
    repoUrl: "https://github.com/ashutoshpaliwal26/fashion-store",
    ownedBy: "Ashutosh Paliwal",
    licence: "MIT Licence",
    type: "SERVER",
    status: "RUNNING",
    success: "TRUE",
  });
});

// Environment
if (NODE_ENV === "development") {
  console.log(`
        Task : Work on Update User API [x]
        Dev Server is Running on : http://localhost:${PORT}
        Host Server is Running on : http://${HOST}:${PORT}
    `);
} else {
  console.log("PRODUCTION SERVER RUNNING");
}

//Listning App
APP.listen(PORT, "0.0.0.0", () => console.log("|--- RUNNING ----|"));
