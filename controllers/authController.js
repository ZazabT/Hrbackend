import { eq } from 'drizzle-orm';
import { db } from '../config/db.js';  
import {users} from '../drizzle/schema.js';  
import {registerSchema , loginSchema} from '../middleware/validator.js'
import bcrypt from 'bcrypt';
// LOGIN CONTROLLER
export const login = async (req , res )=>{

    // Get login data
    const {email , password} = req.body;

    // try to login 
    try {
        // Validate 
        const {error , value} = loginSchema.validate({email , password});

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
        const isValidPassword = await bcrypt.Compare(password , user[0].password);


        if (!isValidPassword) {
            return res.status(401).json({ message: 'Invalid password' });
          }
      
          // Success response (add JWT token in a real app)
          res.status(200).json({ message: 'Login successful', user: user[0] });
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
    const {error , value} =  registerSchema.validate({name , email , password});
    // check if error
    if(error){
        return res.status(401).json({error :error.details[0].message});;
    }
    // check if there is user with this email
    const existEmail = await db.select().from('users').where(eq(users.email , email));

    if(existEmail){
        return res.status(401).json({message : "Email alrady in use"});
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

