import { defineConfig } from 'drizzle-kit';
import dotenv from 'dotenv';
// Initialize Express application


// Load environment variables from .env file
dotenv.config();

const host =  process.env.HOST;
const user = process.env.USER;
const password =  process.env.PASSWORD;
const database =  process.env.DATABASE;
export default defineConfig({
  schema: './drizzle/schema.js',    
  out: './drizzle/migrations',      
  dialect: 'mysql',              
  dbCredentials: {
    host: host,
    user: user,
    password: password, 
    database: database,    
  },
});
