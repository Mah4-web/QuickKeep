import express from "express";
import cors from "cors";
import { db } from "./dbConnection.js";

const app = express();

app.use(express.json());
app.use(cors());

const PORT = 2025

app.listen(PORT, () => {
    console.info(`Server is running in port $(PORT)`);
    });

    app.get("/", (_, res)=> {
    res.send("<h1>Welcome to QuickKeep</h1>");
    });