import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';


// Load environment variables from .env file
dotenv.config();

// Access the JWT_SECRET_KEY
const secretKey = process.env.JWT_SECRET_KEY;

// Middleware to verify JWT
export const verifyToken = (req, res, next) => {
  // Get the token from the 'Authorization' header
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    // Verify the token using the secret key
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded;  
    next(); 
  } catch (error) {
    res.status(400).json({ message: 'Invalid token' });
  }
};
