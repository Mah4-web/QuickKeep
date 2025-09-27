import dotenv from "dotenv";
import pg from "pg";

dotenv.config();

// const dbConnection = process.env.DATABASE_URL;
// Alternative to above method

export const db = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
});