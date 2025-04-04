import express from 'express';
import departmentRoute from './routes/departmentsRoute.js';
import employeesRoute from './routes/employeesRoute.js';
import jobPositionsRoute from './routes/jobPositionsRoute.js';
import salariesRoute from './routes/salariesRoute.js';
import jobListingsRoute from './routes/jobListingsRoute.js';
import leavesRoute  from './routes/leavesRouts.js';
import candidatesRoutes  from './routes/candidatesRoutes.js';
import authRoute  from './routes/authRoute.js';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
// Initialize Express application
const app = express();


// Load environment variables from .env file
dotenv.config();

// Use environment variable for port, with 3000 as fallback
const port = process.env.PORT || 3000;

// Middlewares
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(cookieParser());


// Routes 
app.use('/departments' , departmentRoute);
app.use('/employees' , employeesRoute);
app.use('/jobPositions' , jobPositionsRoute);
app.use('/salaries' , salariesRoute);
app.use('/jobListings' , jobListingsRoute);
app.use('/leaves' , leavesRoute);
app.use('/cadidates' , candidatesRoutes);
app.use('/auth' , authRoute);


// Start the server and listen on specified port
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});