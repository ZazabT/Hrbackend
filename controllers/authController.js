import { eq } from 'drizzle-orm';
import { db } from '../config/db.js';  
import {users} from '../drizzle/schema.js';  
import {registerSchema , loginSchema} from '../middleware/validator.js'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Access the JWT_SECRET_KEY
const secretKey = process.env.JWT_SECRET_KEY;
// Access the JWT_ACCESS_TOKEN_EXPIRE
const accessExpire = process.env.JWT_ACCESS_TOKEN_EXPIRE;
// Access the JWT_ACCESS_TOKEN_EXPIRE
const refreashExpire = process.env.JWT_REFRESH_TOKEN_EXPIRE;



// REFRESH TOKEN CONTROLLER
export  const refreshAccessToken = async (req, res) => {
  
    // Get Refresh token from cookie
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
        return res.status(400).json({ message: 'Refresh token is required' });
    }

    try {
        // Verify refresh token
        const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET_KEY);

        // Generate a new access token
        const newAccessToken   = generateJwtToken(decoded.email,secretKey , accessExpire );

        // Send new access token to the client
        res.status(200).json({ accessToken: newAccessToken });
        
    } catch (error) {
        res.status(403).json({ message: 'Invalid or expired refresh token' });
    }
}

// LOGIN CONTROLLER
export const login = async (req , res )=>{

    // Get login data
    const {email , password} = req.body;

    // try to login 
    try {
        // Validate 
        const {error , value} = loginSchema.validateAsync({email , password});

        // check error 

        if(error){
            return res.status(401).json({error :error.details[0].message});
        }

        // Check if user exists 
        const user = await db.select().from('users').where(eq(users.email . email)).limit(1);

        if (!user.length) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Compare Cradintal
        const isValidPassword = await bcrypt.compare(password , user[0].password);


        if (!isValidPassword) {
            return res.status(401).json({ message: 'Invalid password' });
          }

         // Generate JWT token
         const accessToken  = generateJwtToken(user[0].email,secretKey , accessExpire );
      
         // Generate refresh token 
         const refreshToken = generateJwtToken(user[0].email, process.env.JWT_SECRET_KEY, refreashExpire);

         // Store the refresh token securely in an httpOnly cookie
         res.cookie('refreshToken', refreshToken,{
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'production',
            maxAge: 30 * 24 * 60 * 60 * 1000,  
            sameSite: 'Strict',
         });
          // Success response with token 
          res.status(200).json({ message: 'Login successful', user: user[0] , accessToken  });
    } catch (error) {
        // Return 500 status code and error message
        res.status(500).json({error: error.message});
    }
}


// REGISTER CONTROLLER
export const register = async (req , res )=>{

    // Get register data
    const {name, email, password} = req.body;

    // Try to register 
    try {
         // validate 
    const {error , value} =  registerSchema.validateAsync({name , email , password});
    // check if error
    if(error){
        return res.status(422).json({error :error.details[0].message});;
    }
    // check if there is user with this email
    const existEmail = await db.select().from('users').where(eq(users.email , email));

    if(existEmail){
        return res.status(409).json({message : "Email alrady in use"});
    }
    
    // Hash the password
    const saltRounds = 10; 
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Insert new user with hashed password
    const newUser = await db.insert(users).values({ email, password: hashedPassword, name }).returning();
    
    res.status(201).json({ message: 'User registered', user: newUser[0] });

    } catch (error) {
        // Return 500 status code and error message
        res.status(500).json({error: error.message});
    }
}


// LOGOUT CONTROLLER
export const logout = async (req , res )=>{

    
}


// Function to generate JWT token
const generateJwtToken = (email, secretKey) => {
    const payload = {
      email: email,
    };
  
    // Sign the token with the secret key
    const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });
    
    return token;
  };
  
