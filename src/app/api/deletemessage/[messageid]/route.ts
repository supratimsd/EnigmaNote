import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/option";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { User } from "next-auth";
import { Message } from '@/model/User';
import { NextRequest } from 'next/server';
// import mongoose from "mongoose";

export async function DELETE(request:NextRequest,context:{params:{messageid:string}}){
    const messageId=context.params.messageid
    await dbConnect();
    const session = await getServerSession(authOptions);
    const _user:User = session?.user ;
    if(!session || !_user){
        return Response.json(
            {
                success:false,
                message:"Not Authenticated"
            }, 
            {
                status:401
            });
    }
    try {
        const updateResult=await UserModel.updateOne({
            _id:_user._id,
        },
        {$pull:{messages:{_id:messageId}}}
    )
    if(updateResult.modifiedCount===0){
        return Response.json(
            {
                success:false,
                message:"Message not found or already deleted"
            }, 
            {
                status:404
            });
    }
    return Response.json(
        {
            success:true,
            message:"Message deleted successfully"
        }, 
        {
            status:200
        });
    
    } catch (error) {
        console.log(error);
        return Response.json(
            {
                success:false,
                message:"Internal Server Error",
                error:error
            },
            {
                status:500
            }
        )
    }
    
}
