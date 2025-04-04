import express from 'express';
import { getAllEmployees, addEmployee, deleteEmployee, getEmployeeById, updateEmployee } from '../controllers/employeesController.js';
const route = express.Router();

// GET ALL EMPLOYEES ROUTE
route.get('' ,getAllEmployees)
// GET EMPLOYEE BY ID ROUTE
route.get('/:id' ,getEmployeeById)
// POST (ADD) EMPLOYEE ROUTE
route.post('' ,addEmployee)
// UPDATE EMPLOYEE BY ID ROUTE
route.put('/:id' ,updateEmployee)
//DELETE EMPLOYEE BY ID ROUTE
route.delete('/:id' ,deleteEmployee)


export default route;