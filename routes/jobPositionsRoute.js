import express from 'express';
import { getAlljobPositions , getjobPositionById , addjobPosition , updatejobPosition , deletejobPositions } from '../controllers/jobPositionsController.js';
const route = express.Router();

// GET ALL DEPARTMENTS ROUTE
route.get('' ,getAlljobPositions)
// GET DEPARTMENT BY ID ROUTE
route.get('/:id' ,getjobPositionById)
// POST (ADD) DEPARTMENT ROUTE
route.post('' ,addjobPosition)
// UPDATE DEPARTMENT BY ID ROUTE
route.put('/:id' ,updatejobPosition)
//DELETE DEPARTMENT BY ID ROUTE
route.delete('/:id' ,deletejobPositions)


export default route; 