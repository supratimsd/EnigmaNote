import {z} from 'zod';

export const messageSchema=z.object({
    content:z.string().min(1,{message:"message must be at least 1 character"}).max(300,{message:"message must be no longer than 300 characters"})
})