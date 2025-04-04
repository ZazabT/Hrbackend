import express from 'express';
import { getAllDepartments, addDepartment, deleteDepartment, getDepartmentById, updateDepartment } from '../controllers/departmentsController.js';
const route = express.Router();

// GET ALL DEPARTMENTS ROUTE
route.get('' ,getAllDepartments)
// GET DEPARTMENT BY ID ROUTE
route.get('/:id' ,getDepartmentById)
// POST (ADD) DEPARTMENT ROUTE
route.post('' ,addDepartment)
// UPDATE DEPARTMENT BY ID ROUTE
route.put('/:id' ,updateDepartment)
//DELETE DEPARTMENT BY ID ROUTE
route.delete('/:id' ,deleteDepartment)


export default route;