import express from 'express';
import { getAllSalaries, getsalaryId, deletesalary, addsalary, updatesalary } from '../controllers/salariesController.js';
const route = express.Router();

// GET ALL SALARIES ROUTE
route.get('' ,getAllSalaries)
// GET SALARIE BY ID ROUTE
route.get('/:id' ,getsalaryId)
// POST (ADD) SALARIE ROUTE
route.post('' ,addsalary)
// UPDATE SALARIE BY ID ROUTE
route.put('/:id' ,updatesalary)
//DELETE SALARIE BY ID ROUTE
route.delete('/:id' ,deletesalary)


export default route;