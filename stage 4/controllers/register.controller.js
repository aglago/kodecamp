import User from "../models/user.models.js";
import bcrypt from "bcryptjs";

const register = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    
    // check if email exists
    const user = await User.findOne({ email });
    if (user) return res.status(400).send({ message: "User already exists" });

    // hashing password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //TODO: send email to user

    // Save user to database (Register)
    await User.create({ fullName, email, password: hashedPassword });

    // Send success message
    res.status(201).send({ message: `Registered ${fullName} successfully` });
  } catch (error) {
    console.log("Error in register controller:", error.message);
    return res.status(500).send({ message: "Failed to register user" });
  }
};

export default register;
