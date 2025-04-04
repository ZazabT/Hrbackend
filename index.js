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

// Initialize Express application
const app = express();


const port = 3000;

// Middlewares
app.use(express.json());
app.use(cors());


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