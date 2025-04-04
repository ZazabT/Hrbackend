import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import * as schema from '../drizzle/schema.js'; 
import dotenv from 'dotenv';
// Initialize Express application


// Load environment variables from .env file
dotenv.config();

const host =  process.env.HOST;
const user = process.env.USER;
const password =  process.env.PASSWORD;
const database =  process.env.DATABASE;

// Create a MySQL connection pool
const pool = mysql.createPool({
    host: host,
    user: user,
    password: password, 
    database: database,   
});

// Test connection
pool.getConnection()
    .then(() => console.log('Database connection successful'))
    .catch(err => console.error('Database connection failed:', err));

// Export the db object
export const db = drizzle(pool, { 
    schema,
    mode: 'strict', 
});
