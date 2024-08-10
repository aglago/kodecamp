import AuthToken from "../models/authToken.model.js";
import bcrypt from "bcryptjs";
import generateJWT from "../utils/generateJWT.js";
import User from "../models/user.models.js";
import { v4 } from "uuid";

export const register = async (req, res) => {
  try {
    const { fullName, email, password, role } = req.body;

    // check if email exists
    const user = await User.findOne({ email });
    if (user) return res.status(400).send({ message: "User already exists" });

    // hashing password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //TODO: send email to user

    // Save user to database (Register)
    await User.create({ fullName, email, password: hashedPassword, role });

    // Send success message
    res.status(201).send({ message: `Registered ${fullName} successfully as ${role}` });
  } catch (error) {
    console.log("Error in register controller:", error.message);
    return res.status(500).send({ message: "Failed to register user" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // check if user exists and password is correct
    const user = await User.findOne({ email });
    if (!user) return res.status(404).send({ message: "User does not exist" });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.status(401).send({ message: "Invalid password" });

    // generate jwt token
    const jwt = generateJWT({ id: user._id, email, role: user.role });

    // send response
    res.send({
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
      },
      token: jwt,
    });
  } catch (error) {
    console.log("Error in login controller:", error.message);
  }
};

export const forgotPassword = async (req, res) => {
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
      userId: user._id,
    });
  } catch (error) {
    console.log("Error in forgot password controller:", error.message);
    res.status(500).send({ message: "Failed to send reset password link" });
  }
};

export const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;
  // validate token
  const databaseToken = await AuthToken.findOne({ token });
  if (!databaseToken) return res.status(400).json({ message: "Invalid token" });

  // hash new password
  const salt = await bcrypt.genSalt(10);
  const hashedNewPassword = await bcrypt.hash(newPassword, salt);

  // update user password
  const user = await User.findByIdAndUpdate(databaseToken.userId, {
    password: hashedNewPassword,
  });
  if (!user) return res.status(400).json({ message: "User not found" });

  // delete token from database
  await AuthToken.findByIdAndDelete(databaseToken._id);

  res.status(200).json({ message: "Password reset successfully" });
};
