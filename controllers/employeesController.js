import { db } from '../config/db.js'; 
import { eq } from 'drizzle-orm';
import { employees } from '../drizzle/schema.js';

// GET ALL EMPLOYEES CONTROLLER
export const getAllEmployees = async (req, res) => {
  // Try to get all departments
  try{
    const employeesList = await db.select().from(employees);
    // Return 200 status code and departments
    res.status(200).json({'employees': employeesList , 'count': employeesList.length , 'message': 'employees fetched successfully'} );
    }catch(error){
        // Return 500 status code and error message
        res.status(500).json({error: error.message});
    }
}

// GET EMPLOYEE BY ID CONTROLLER
export const getEmployeeById = async (req, res) => {
  // Get departmenet id
       const { id } = req.params;
  
       // Try to get department by id
       try{
          const employee = await db.select().from(employees).where(eq(employees.id , id));
          // Return 200 status code and department
          res.status(200).json({'employee': employee , 'message': 'employee fetched successfully'} );
       }catch(error){
          // Return 500 status code and error message
          res.status(500).json({error: error.message});
       }
}

// POST (ADD) EMPLOYEE CONTROLLER
export const addEmployee = async (req, res) => {
   // Get department data
      const { firstName , lastName ,email ,phone ,address ,birthDate ,hireDate} = req.body;
  
      // Try to add department
      try{
          const employee = await db.insert(employees).values({ firstName , lastName ,email ,phone ,address ,birthDate ,hireDate });
          // Return 201 status code and department
          res.status(201).json({'employee': employee , 'message': 'employee created successfully'} );
      }catch(error){
          // Return 500 status code and error message
          res.status(500).json({error: error.message});
      }
}

// UPDATE EMPLOYEE BY ID CONTROLLER
export const updateEmployee = async (req, res) => {
   // Get department id
      const { id } = req.params;
  
      // Get department data
      const { firstName , lastName ,email ,phone ,address ,birthDate ,hireDate } = req.body;
  
      // Try to update department by id
      try{
          const employee = await db.update(employees).set({firstName , lastName ,email ,phone ,address ,birthDate ,hireDate}).where(eq(employees.id , id));
          // Return 200 status code and department
          res.status(200).json({'employee': employee , 'message': 'employee updated successfully'} );
      }catch(error){
          // Return 500 status code and error message
          res.status(500).json({error: error.message});
      }
}

// DELETE EMPLOYEE BY ID CONTROLLER
export const deleteEmployee = async (req, res) => {
     // Get department id
      const { id } = req.params;
  
      // Try to delete department by id
      try{
          const employee = await db.delete(employees).where(eq(employees.id , id));
          // Return 200 status code and department
          res.status(200).json({'employee': employee , 'message': 'employee deleted successfully'} );
      }catch(error){
          // Return 500 status code and error message
          res.status(500).json({error: error.message});
      }
}
