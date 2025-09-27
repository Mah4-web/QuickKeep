import express from "express";
import cors from "cors";
import { db } from "./dbConnection.js";

const app = express();

app.use(express.json());
app.use(cors());

// From week 6 I learned environment variable and wanted to experiment here
const PORT = 2026;

app.listen(PORT, () => {
    console.info(`Server is running in port ${PORT}`);
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

// read data from types table

app.get('/types', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM types;');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching types:', error);
    res.status(500).json({ success: false });
  }
});

// TODO: create new data in the entries table

app.post("/add-entries", async(req, res) => {
  // const emtriedData = req.body;
  //destructure the body (alternative)
    const { title, content, likes, typeId, categoryId } = req.body;

    try {
    const query = await db.query(
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
app.delete("/delete-entry/:id", async (req, res) => {
    try {
    //the request has an object called params
    const paramsId = req.params.id;

    //destructure the params object
    // const { id } = req.params;

    //query the database to delete one entry
    const query = await db.query(`DELETE FROM entries WHERE id = $1 RETURNING *;`, [
        paramsId,
    ]);
    } catch (error) {
    console.error("Error in the delete-entries route", error);
    res.status(500).json({ success: false });
    }
});

//TODO: update an entry in the entries table
app.put("/update-entry/:id", async(req, res) => {
    try {
    
    const paramsId = req.params.id;
    const newEntry = req.body;

    const query = await db.query(
      `UPDATE entries SET title = $1, content= $2, likes = $3, type_id = $4, category_id = $5 WHERE id = $6 RETURNING *;`,
        [
        newEntry.title,
        newEntry.content,
        newEntry.likes,
        newEntry.typeId,
        newEntry.categoryId,
        paramsId,
        ]
    );
    } catch (error) {
    console.error("Error in update-entries route", error);
    res.status(500).json({ success: false });
    }
});

