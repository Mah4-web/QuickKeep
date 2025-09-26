import express from "express";
import cors from "cors";
import { db } from "./dbConnection.js";

const app = express();

app.use(express.json());
app.use(cors());

const PORT = 2026

app.listen(PORT, () => {
    console.info(`Server is running in port $(PORT)`);
    });

    app.get("/", (_, res)=> {
    res.send("<h1>Welcome to QuickKeep</h1>");
    });

  //TODO: read data from the entries table
app.get("/entries", async (_, res) => {
  //error handling
  //try ... catch
    try {
    //query the database to send me the entries data
    //I tested my query in the SQL editor first to check syntax
    const data = await db.query(
        `SELECT title, content, likes, type_id, category_id FROM entries;`
    );
    
    res.json(data.rows);
    } catch (error) {
    console.error("Error in the entries route", error);
    res.status(500).json({ success: false });
    }
});


