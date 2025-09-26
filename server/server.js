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

// TODO: create new data in the entries table

app.post("/add-entries",(req, res) => {
  // const emtriedData = req.body;
  //destructure the body (alternative)
    const { title, content, likes, typeId, categoryId } = req.body;

    try {
    const query = db.query(
         //I tested my query in the SQL editor first to check syntax
        `INSERT INTO entries (title, content, likes, type_id, category_id) VALUES 
($1, $2, $3, $4, $5);`,
        [title, content, likes, typeId, categoryId]
    );
    res.status(200).json({ success: true });
    } catch (error) {
    console.error("Error in add-entries route", error);
    res.status(500).json({ success: false });
    }
});

//TODO: delete an entry from the entries table
app.delete("/delete-entry/:id", (req, res) => {
    try {
    //the request has an object called params
    const paramsId = req.params.id;

    //destructure the params object
    // const { id } = req.params;

    //query the database to delete one entry
    const query = db.query(`DELETE FROM entries WHERE id = $1 RETURNING *;`, [
        paramsId,
    ]);
    } catch (error) {
    console.error("Error in the delete-entries route", error);
    res.status(500).json({ success: false });
    }
});

