import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/option";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { User } from "next-auth";
import mongoose from "mongoose";

export async function GET(request:Request){
    await dbConnect();
    const session = await getServerSession(authOptions);
    const _user:User = session?.user ;
    if(!session || !_user){
        return Response.json(
            {
                success:false,
                message:"Not authenticated"
            }, 
            {
                status:401
            });
    }
    const userId = new mongoose.Types.ObjectId(_user._id);
    try {
        const user=await UserModel.aggregate([
            {$match:{_id:userId}},
            {$unwind:"$messages"},
            {$sort:{"messages.createdAt":-1}},
            {$group:{_id:"$_id", messages:{$push:"$messages"}}},
        ])
        if(!user || user.length===0){
            return Response.json(
                {
                    success:false,
                    message:"No user found"
                }, 
                {
                    status:404
                });
        }
        return Response.json(
            {
                //success:true,
                messages:user[0].messages
            }, 
            {
                status:200
            });
    } catch (error) {
        console.log("error",error)
        return Response.json(
            {
                success:false,
                message:"Internal server error"
            },
            {
                status:500
            });
    }
}
