import mongoose from "mongoose";

const connectToDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log("Error in connectToDatabase function", error.message);
    }
}

export default connectToDatabase;