import { eq } from 'drizzle-orm';
import { db } from '../config/db.js';  
import { leaves} from '../drizzle/schema.js';  


// GET ALL LEAVES CONTROLLER
export const getAlleaves = async (req , res )=>{

    // Try to get all leaves
    try{
        const leavesList = await db.select().from(leaves);
        // Return 200 status code and leaves
        res.status(200).json({'leaves': leavesList , 'count': leavesList.length , 'message': 'Leaves fetched successfully'} );
    }catch(error){
        // Return 500 status code and error message
        res.status(500).json({error: error.message});
    }
}


// GET LEAVES BY ID  CONTROLLER
export const getleaveById = async (req , res )=>{

    // Get leave id
     const { id } = req.params;

     // Try to get leave by id
     try{
        const leave = await db.select().from(leaves).where(eq(leaves.id , id));
        // Return 200 status code and leave
        res.status(200).json({'leave': leave , 'message': 'Leave fetched successfully'} );
     }catch(error){
        // Return 500 status code and error message
        res.status(500).json({error: error.message});
     }
}


// POST (ADD) LEAVES CONTROLLER
export const addleave= async (req , res )=>{

    // Get leave data
    const { employeeId , startDate , endDate , leaveType , reason } = req.body;

    // Try to add leave
    try{
        const leave = await db.insert(leaves).values({employeeId , startDate , endDate , leaveType , reason });
        // Return 201 status code and leave
        res.status(201).json({'leave': leave , 'message': 'Leave created successfully'} );
    }catch(error){
        // Return 500 status code and error message
        res.status(500).json({error: error.message});
    }
}


// UPDATE LEAVES BY ID CONTROLLER
export const updateleave = async (req , res )=>{

    // Get leave id
    const { id } = req.params;

    // Get leave data
    const { employeeId , startDate , endDate , leaveType , reason } = req.body;

    // Try to update leave by id
    try{
        const leave = await db.update(leaves).set({employeeId , startDate , endDate , leaveType , reason}).where(eq(leaves.id , id));
        // Return 200 status code and leave
        res.status(200).json({'leave': leave , 'message': 'Leave updated successfully'} );
    }catch(error){
        // Return 500 status code and error message
        res.status(500).json({error: error.message});
    }
}


//DELETE LEAVES BY ID CONTROLLER
export const deleteleave =async (req , res )=>{

    // Get leave id
    const { id } = req.params;

    // Try to delete leave by id
    try{
        const leave = await db.delete(leaves).where(eq(leaves.id , id));
        // Return 200 status code and leave
        res.status(200).json({'leave': leave , 'message': 'Department deleted successfully'} );
    }catch(error){
        // Return 500 status code and error message
        res.status(500).json({error: error.message});
    }

}

