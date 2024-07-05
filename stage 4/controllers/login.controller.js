import User from "../models/user.models.js";
import bcrypt from "bcryptjs";
import generateJWT from "../generateJWT.js";

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // check if user exists and password is correct
        const user = await User.findOne({ email });
        if (!user)
          return res.status(404).send({ message: "User does not exist" });

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid)
          return res.status(401).send({ message: "Invalid password" });

        // generate jwt token
        const jwt = generateJWT({ id: user._id, email });

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

export default login;
