import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/option";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { User } from "next-auth";

export async function POST(request: Request) {
    await dbConnect();
    const session=await getServerSession(authOptions);
    const user:User= session?.user as User;

    if(!session || !session.user){
        return Response.json({
            success:false,
            message:"not authenticated",
        },
        {
            status:401,
        })
    }
    const userId=user._id;
    const {acceptMessages} = await request.json();
    try {
        const updatedUser=await UserModel.findByIdAndUpdate(userId, {
            isAcceptingMessage: acceptMessages,
        },
        {
            new :true,
        }
    )
    if(!updatedUser){
        return Response.json({
            success:false,
            message:"User not found",
        },
        {
            status:401,
        })
    }
    return Response.json({
        success: true,
        message: "Messages accepted successfully",
    },
    {
        status:200,
    })
    } catch (error) {
        console.log("Error accepting messages", error);
        return Response.json({
            success: false,
            message: "Error accepting messages",
        },
        {
            status:500,
        })
        
    }
}

export async function GET(request: Request) {
    await dbConnect();
    const session=await getServerSession(authOptions);
    const user:User= session?.user as User;

    if(!session || !session.user){
        return Response.json({
            success:false,
            message:"not authenticated",
        },
        {
            status:401,
        })
    }
    const userId=user._id;
    try {
        const foundUser=await UserModel.findById(userId);
    if(!foundUser){
        return Response.json({
            success:false,
            message:"User not found",
        },
        {
            status:401,
        })
    }
    return Response.json({
        success:true,
        message:"User found",
        isAcceptingMessage:foundUser.isAcceptingMessage,
    },
    {
        status:200,
    })
    } catch (error) {
        console.log("Error fetching user", error);
        return Response.json({
            success:false,
            message:"Error fetching user",
        },
        {
            status:500,
        })
        
        
    }
}