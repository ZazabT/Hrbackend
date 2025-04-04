import express from 'express';
import { addJobListing, getAllJobListings, deleteJobListing, getJobListingById, updateJobListing , updateJobListingStatus} from '../controllers/jobListingsController.js';

const route = express.Router();

// GET ALL JOBLISTINGS ROUTE
route.get('' ,getAllJobListings)
// GET JOBLISTINGS BY ID ROUTE
route.get('/:id' ,getJobListingById)
// POST (ADD) JOBLISTINGS ROUTE
route.post('' ,addJobListing)
// UPDATE JOBLISTINGS BY ID ROUTE
route.put('/:id' ,updateJobListing)
//DELETE JOBLISTINGS BY ID ROUTE
route.delete('/:id' ,deleteJobListing)
// UPDATE JOBLISTINGS STATUS BY ID ROUTE
route.put('/updateStatus', updateJobListingStatus )


export default route;