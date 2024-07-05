import { v4 } from "uuid";
import User from "../models/user.models.js";
import AuthToken from "../models/authToken.model.js";

const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) return res.status(404).send({ message: "Email not registered" });

        const token = v4();
        await AuthToken.create({
          userId: user._id,
          token,
          purpose: "password_reset",
        });

        // send password reset email

        res.status(200).send({
            message: "Reset password link sent to your email",
            token,
            userId: user._id
        });
        
    } catch (error) {
        console.log("Error in forgot password controller:", error.message);
        res.status(500).send({ message: "Failed to send reset password link" });
    }
}

export default forgotPassword;