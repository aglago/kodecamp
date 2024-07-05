import mongoose from "mongoose";
import { type } from "os";

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    authToken: {
        type: String,
        default: ""
    },
    authPurpose: {
        type: String,
        default: ""
    }
}, { timestamps: true })

const User = mongoose.model("User", userSchema);
export default User;