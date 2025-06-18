// import { connect } from "http2";
import mongoose from "mongoose";

type ConnectionObject={
    isConnected?:number
}

const connection: ConnectionObject = {};
// console.log("hey")
// console.log("MONGODB_URI:", process.env.MONGODB_URI);

async function dbConnect() : Promise<void> {
    if(connection.isConnected){
        console.log("Already connected to DB");
        return
    }

    try {
        const db = await mongoose.connect(process.env.MONGODB_URI || '', {})
        connection.isConnected = db.connections[0].readyState;
        console.log("Connected to DB successfully");
        // console.log(db);
    } catch (error) {
        console.log("Error connecting to DB", error);
        process.exit(1);
    }

}

// dbConnect()
//     .then(() => console.log("Database connection initialized"))
//     .catch(err => console.error("Failed to initialize database connection:", err));

export default dbConnect;