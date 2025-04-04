import express from 'express';
import { getAlleaves , getleaveById , addleave , updateleave , deleteleave } from '../controllers/leavesController.js';
const route = express.Router();

// GET ALL LEAVE ROUTE
route.get('' ,getAlleaves)
// GET LEAVE BY ID ROUTE
route.get('/:id' ,getleaveById)
// POST (ADD) LEAVE ROUTE
route.post('' ,addleave)
// UPDATE LEAVE BY ID ROUTE
route.put('/:id' ,updateleave)
//DELETE LEAVE BY ID ROUTE
route.delete('/:id' ,deleteleave)


export default route; 