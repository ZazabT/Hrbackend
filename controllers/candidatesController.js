import { eq } from 'drizzle-orm';
import { db } from '../config/db.js';  
import {candidates} from '../drizzle/schema.js';  


// GET ALL CANDIDATES CONTROLLER
export const getAllCandidates = async (req , res )=>{

    // Try to get all candidates
    try{
        const candidatesList  = await db.select().from(candidates);
        // Return 200 status code and candidates
        res.status(200).json({'candidatesList': candidates , 'count': candidatesList.length , 'message': 'candidates fetched successfully'} );
    }catch(error){
        // Return 500 status code and error message
        res.status(500).json({error: error.message});
    }
}


// GET CANDIDATES BY ID  CONTROLLER
export const getCandidateById = async (req , res )=>{

    // Get candidate id
     const { id } = req.params;

     // Try to get candidate by id
     try{
        const candidate = await db.select().from(candidates).where(eq(candidates.id , id));
        // Return 200 status code and candidate
        res.status(200).json({'candidate': candidate , 'message': 'Candidate fetched successfully'} );
     }catch(error){
        // Return 500 status code and error message
        res.status(500).json({error: error.message});
     }
}


// POST (ADD) CANDIDATES CONTROLLER
export const addCandidate= async (req , res )=>{

    // Get candidate data
    const { jobListingId , firstName , lastName , email , phone , address , coverLetter } = req.body;

    // Try to add candidate
    try{
        const candidate = await db.insert(candidates).values({jobListingId , firstName , lastName , email , phone , address , coverLetter });
        // Return 201 status code and candidate
        res.status(201).json({'candidate': candidate , 'message': 'Candidate created successfully'} );
    }catch(error){
        // Return 500 status code and error message
        res.status(500).json({error: error.message});
    }
}


// UPDATE CANDIDATES BY ID CONTROLLER
export const updateCandidate = async (req , res )=>{

    // Get candidates id
    const { id } = req.params;

    // Get candidates data
    const { jobListingId , firstName , lastName , email , phone , address , coverLetter } = req.body;

    // Try to update candidate by id
    try{
        const candidate = await db.update(candidates).set({jobListingId , firstName , lastName , email , phone , address , coverLetter}).where(eq(candidates.id , id));
        // Return 200 status code and candidate
        res.status(200).json({'candidate': candidate , 'message': 'Candidate updated successfully'} );
    }catch(error){
        // Return 500 status code and error message
        res.status(500).json({error: error.message});
    }
}


//DELETE CANDIDATES BY ID CONTROLLER
export const deleteCandidate =async (req , res )=>{

    // Get candidates id
    const { id } = req.params;

    // Try to delete candidate by id
    try{
        const candidate = await db.delete(candidates).where(eq(candidates.id , id));
        // Return 200 status code and candidate
        res.status(200).json({'candidate': candidate , 'message': 'Candidate deleted successfully'} );
    }catch(error){
        // Return 500 status code and error message
        res.status(500).json({error: error.message});
    }

}


// UPDATE CANDIDATES STATUS
export const updateCandidateStatus =async (req , res )=>{

    // Get candidates id and status
    const { id , status } = req.body;

    // Check if the status is valid
    if (!['applied', 'interviewing', 'offer', 'rejected'].includes(status)) {
        return res.status(400).json({ message: 'Invalid status' }); // Check if the status is valid
      }

    // Try to update candidate by id
    try{
        const candidateList  = await db.select().from(candidates).where(eq(candidates.id , id));
        // Update candidate status
        const updatedCandidate = await db.update(candidates).set({ status }).where(eq(candidates.id , id));
        // Return 200 status code and candidate
        res.status(200).json({'candidate': updatedCandidate , 'message': 'Candidate status updated successfully'} );
    }catch(error){
        // Return 500 status code and error message
        res.status(500).json({error: error.message});
    }
}



