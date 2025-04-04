import express from 'express';
import { getAllCandidates , getCandidateById , addCandidate , updateCandidate , deleteCandidate , updateCandidateStatus} from '../controllers/candidatesController.js';
const route = express.Router();

// GET ALL CANDIDATES ROUTE
route.get('' ,getAllCandidates)
// GET CANDIDATES BY ID ROUTE
route.get('/:id' ,getCandidateById)
// POST (ADD) CANDIDATES ROUTE
route.post('' ,addCandidate)
// UPDATE CANDIDATES BY ID ROUTE
route.put('/:id' ,updateCandidate)
//DELETE CANDIDATES BY ID ROUTE
route.delete('/:id' ,deleteCandidate)
// UPDATE CANDIDATE STATUS BY ID ROUTE
route.put('/updateStatus' ,updateCandidateStatus)

export default route; 