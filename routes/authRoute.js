import express from 'express';
import {login , logout ,register ,refreshAccessToken } from '../controllers/authController.js';
import {verifyToken} from '../middleware/authMiddlewate.js'
import rateLimit from 'express-rate-limit';


const route = express.Router();


// Set rate limit (e.g., 5 requests per minute)
const limiter = rateLimit({
    windowMs: 1 * 60 * 1000,  // 1 minute
    max: 5,  // Allow 5 requests per minute
    message: 'Too many requests from this IP, please try again later',
});

// Login Route
route.post('/login' , limiter ,login );

// Register Route
route.post('/register' ,register);

// Logout Route
route.post('/logout' ,logout , verifyToken);

// Refresh token
route.post('//refresh-token' , refreshAccessToken)



export default route;

