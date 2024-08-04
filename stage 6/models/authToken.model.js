import mongoose from "mongoose";

const authTokenSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    token: {
        type: String,
        required: true
    },
    purpose: {
        type: String,
        required: true
    }
    // Maybe an expired at field?
}, { timestamps: true });

const AuthToken = mongoose.model("AuthToken", authTokenSchema);
export default AuthToken;