import Joi from "joi";

export const registerSchema = Joi.object({
    email:Joi.string().email().min(6).max(60).required().email({
        tlds:{allow:['com' , 'net']}
    }),
    
    password:Joi.string().required().pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$")),
    name:Joi.string().required().alphanum().min(4).max(60)
});



export const loginSchema = Joi.object({
    email:Joi.string().min(6).max(60).required().email({
        tlds:{allow:['com' , 'net']}
    }),
    
    password:Joi.string().required().pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$")),
});