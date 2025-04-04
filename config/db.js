import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import * as schema from '../drizzle/schema.js'; 

// Create a MySQL connection pool
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'cAx2ZYeUtElfpSZM', 
    database: 'xokahr_databse',  
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
