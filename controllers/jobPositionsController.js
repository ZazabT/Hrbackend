import { db } from '../config/db.js';  
import { jobPositions} from '../drizzle/schema.js';  


// GET ALL JOBPOSITIONS CONTROLLER
export const getAlljobPositions = async (req , res )=>{

    // Try to get all jobPositions
    try{
        const jobPositionsList = await db.select().from(jobPositions);
        // Return 200 status code and jobPositions
        res.status(200).json({'jobPositions': jobPositionsList , 'count': jobPositionsList.length , 'message': 'jobPositions fetched successfully'} );
    }catch(error){
        // Return 500 status code and error message
        res.status(500).json({error: error.message});
    }
}


// GET JOBPOSITION BY ID  CONTROLLER
export const getjobPositionById = async (req , res )=>{

    // Get jobPosition id
     const { id } = req.params;

     // Try to get jobPosition by id
     try{
        const jobPosition = await db.select().from(jobPositions).where(eq(jobPositions.id , id));
        // Return 200 status code and jobPosition
        res.status(200).json({'jobPosition': jobPosition , 'message': 'jobPosition fetched successfully'} );
     }catch(error){
        // Return 500 status code and error message
        res.status(500).json({error: error.message});
     }
}


// POST (ADD) JOBPOSITION CONTROLLER
export const addjobPosition = async (req , res )=>{

    // Get jobPosition data
    const { jobTitle ,  jobDescription , minSalary , maxSalary , departmentId} = req.body;

    // Try to add jobPosition
    try{
        const jobPosition = await db.insert(jobPositions).values({jobTitle ,  jobDescription , minSalary , maxSalary , departmentId});
        // Return 201 status code and jobPosition
        res.status(201).json({'jobPosition': jobPosition , 'message': 'jobPosition created successfully'} );
    }catch(error){
        // Return 500 status code and error message
        res.status(500).json({error: error.message});
    }

}


// UPDATE JOBPOSITION BY ID CONTROLLER
export const updatejobPosition = async (req , res )=>{

    // Get jobPosition id
    const { id } = req.params;

    // Get jobPosition data
    const { jobTitle ,  jobDescription , minSalary , maxSalary , departmentId} = req.body;

    // Try to update jobPosition by id
    try{
        const jobPosition = await db.update(jobPositions).set({jobTitle ,  jobDescription , minSalary , maxSalary , departmentId}).where(eq(jobPositions.id , id));
        // Return 200 status code and jobPosition
        res.status(200).json({'jobPosition': jobPosition , 'message': 'jobPosition updated successfully'} );

    }catch(error){
        // Return 500 status code and error message
        res.status(500).json({error: error.message});
    }
}


// DELETE JOBPOSITIONS BY ID CONTROLLER
export const deletejobPositions = async (req , res )=>{

    // Get jobPosition id
    const { id } = req.params;

    // Try to delete jobPosition by id
    try{
        const jobPosition = await db.delete(jobPositions).where(eq(jobPositions.id , id));
        // Return 200 status code and jobPosition
        res.status(200).json({'jobPosition': jobPosition , 'message': 'jobPosition deleted successfully'} );
    }catch(error){
        // Return 500 status code and error message
        res.status(500).json({error: error.message});
    }
}