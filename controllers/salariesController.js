import { db } from '../config/db.js';   
import { salaries} from '../drizzle/schema.js';  


// GET ALL SALARIES CONTROLLER
export const getAllSalaries = async (req , res )=>{

    // Try to get all jobPositions
    try{
        const salariesList = await db.select().from(salaries);
          // Return 200 status code and salaries
          res.status(200).json({'salaries': salariesList , 'count': salariesList.length , 'message': 'salaries fetched successfully'} );

    }catch(error){
        // Return 500 status code and error message
        res.status(500).json({error: error.message});
    }
}


// GET SALARY BY ID  CONTROLLER
export const getsalaryId = async (req , res )=>{

    // Get salary id
     const { id } = req.params;

     // Try to get salary by id
     try{
        const salary = await db.select().from(salaries).where(eq(salaries.id , id));
        // Return 200 status code and salary
        res.status(200).json({'salary': salary , 'message': 'salary fetched successfully'} );

     }catch(error){
        // Return 500 status code and error message
        res.status(500).json({error: error.message});
     }
}


// POST (ADD) SALARY CONTROLLER
export const addsalary = async(req , res )=>{

    // Get salary data
    const { employeeId ,  amount , date} = req.body;

    // Try to add salrya
    try{
        const salary = await db.insert(salaries).values({employeeId ,  amount , date});
        // Return 201 status code and salary
        res.status(201).json({'salary': salary , 'message': 'salary created successfully'} );

    }catch(error){
        // Return 500 status code and error message
        res.status(500).json({error: error.message});
    }
}


// UPDATE SALARY BY ID CONTROLLER
export const updatesalary = async (req , res )=>{

    // Get salary id
    const { id } = req.params;

    // Get salary data
    const { employeeId ,  amount , date} = req.body;
    
    try {
        const salary = await db.update(salaries).set({employeeId ,  amount , date});
        // Return 200 status code and salary
        res.status(200).json({'salary': salary , 'message': 'salary updated successfully'} );
        
    } catch (error) {
        // Return 500 status code and error message
        res.status(500).json({error: error.message});
    }
}


// DELETE SALARY BY ID CONTROLLER
export const deletesalary = async (req , res )=>{

    // Get salary id
    const { id } = req.params;

    // Try to delete salary by id
    try{
        const salary = await db.delete(salaries).where(eq(salaries.id , id));
        // Return 200 status code and salary
        res.status(200).json({'salary': salary , 'message': 'salary deleted successfully'} );

    }catch(error){
        // Return 500 status code and error message
        res.status(500).json({error: error.message});
    }
}