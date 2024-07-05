import AuthToken from "../models/authToken.model.js";
import User from "../models/user.models.js";
import bcrypt from "bcryptjs";

const resetPassword = async (req, res) => {
    const { token, newPassword } = req.body;
    // validate token
    const databaseToken = await AuthToken.findOne({ token });
    if (!databaseToken) return res.status(400).json({ message: "Invalid token" });

    // hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedNewPassword = await bcrypt.hash(newPassword, salt);

    // update user password
    const user = await User.findByIdAndUpdate(databaseToken.userId, { password: hashedNewPassword });
    if (!user) return res.status(400).json({ message: "User not found" });

    // delete token from database
    await AuthToken.findByIdAndDelete(databaseToken._id);

    res.status(200).json({ message: "Password reset successfully" });
}

export default resetPassword;