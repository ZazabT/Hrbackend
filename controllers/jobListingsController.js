import { eq } from 'drizzle-orm';
import { db } from '../config/db.js';  
import { jobListings } from '../drizzle/schema.js';  


// GET ALL JOBLISTINGS CONTROLLER
export const getAllJobListings = async (req, res) => {

    // Try to get all joblistings
    try {
        const jobListingsList  = await db.select().from(jobListings);
        // Return 200 status code and jobListings
        res.status(200).json({'jobListings': jobListingsList , 'count': jobListingsList.length , 'message': 'jobListings fetched successfully'} );
        
    } catch (error) {
         // Return 500 status code and error message
         res.status(500).json({error: error.message});
    }
}


// GET JOBLISTINGS BY ID  CONTROLLER
export const getJobListingById = async (req , res )=>{

    // Get departmenet id
    const { id } = req.params;

    try {
        const jobListing = await db.select().from(jobListings).where(eq(jobListings.id , id));
        
        // Return 200 status code and jobListing
        res.status(200).json({'jobListing': jobListing , 'message': 'jobListings fetched successfully'} );
    } catch (error) {
        // Return 500 status code and error message
        res.status(500).json({error: error.message});
    }
}


// POST (ADD) JOBLISTINGS CONTROLLER
export const addJobListing = async (req , res )=>{

    // Get jobListing id
    const { id } = req.params;

    // Get jobListing data
    const { jobTitle ,  deadlineDate , jobRequirements , postedDate , jobPositionId , status} = req.body;

    // Try to add jobListing
    try{
        const jobListing = await db.insert(jobListings).values({jobTitle ,  deadlineDate , jobRequirements , postedDate , jobPositionId , status});
        // Return 200 status code and jobListing
        res.status(200).json({'jobListing': jobListing , 'message': 'jobListing added successfully'} );
    }catch(error){
        // Return 500 status code and error message
        res.status(500).json({error: error.message});
    }
}


// UPDATE JOBLISTINGS BY ID CONTROLLER
export const updateJobListing = async (req , res )=>{

    // Get jobListing id
    const { id } = req.params;

    // Get jobListing data
    const { jobTitle ,  deadlineDate , jobRequirements , postedDate , jobPositionId , status} = req.body;

    // Try to update jobListing by id
    try{
        const jobListing = await db.update(jobListings).set({jobTitle ,  deadlineDate , jobRequirements , postedDate , jobPositionId , status}).where(eq(jobListings.id , id));
        // Return 200 status code and jobListing
        res.status(200).json({'jobListing': jobListing , 'message': 'jobListing updated successfully'} );
    }catch(error){
        // Return 500 status code and error message
        res.status(500).json({error: error.message});
    }
}


//DELETE JOBLISTINGS BY ID CONTROLLER
export const deleteJobListing =async (req , res )=>{

    // Get jobListing id
    const { id } = req.params;

    // Try to delete department by id
    try{
        const jobListing = await db.delete(jobListings).where(eq(jobListings.id , id));
        // Return 200 status code and department
        res.status(200).json({'jobListing' : jobListing , 'message': 'jobListing deleted successfully'} );
    }catch(error){
        // Return 500 status code and error message
        res.status(500).json({error: error.message});
    }
}


// UPDATE JOBLISTINGS STATUS
export const updateJobListingStatus = async (req , res )=>{

    // Get jobListing id and status
    const { id , status } = req.body;

    // Check if the status is valid
    if (!['open', 'closed'].includes(status)) {
        return res.status(400).json({ message: 'Invalid status' }); // Check if the status is valid
      }

    // Try to update jobListing by id
    try{
        const jobListing = await db.select().from(jobListings).where(eq(jobListings.id , id));
        // Update jobListing status
        const updatedJobListing = await db.update(jobListing).set({ status }).where(eq(jobListings.id , id));
        // Return 200 status code and jobListing
        res.status(200).json({'jobListing': updatedJobListing , 'message': 'jobListing status updated successfully'} );
    }catch(error){
        // Return 500 status code and error message
        res.status(500).json({error: error.message});
    }
}