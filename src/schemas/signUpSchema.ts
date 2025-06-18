import {z} from 'zod';

export const userNameValidation=z.string().min(2,"username must be at least 2 characters").max(16,"userName must be at max 16 characters").regex(/^[a-zA-Z0-9_]+$/,"username must not be alphanumeric")

export const signUpSchema=z.object({
    username:userNameValidation,
    email:z.string().email({message:"Invalid email address"}),
    password:z.string().min(6,{message:"password must be at laest 6 characters"}),
})