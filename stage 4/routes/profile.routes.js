import express from "express";
import verifyUser from "../verifyUser.middleware.js";
import User from "../models/user.models.js";

const profileRoutes = express.Router();

profileRoutes.use(verifyUser);

profileRoutes.get("/", async (req, res) => {
    // Retrieve user information and send it back to the client
    const userEmail = req.user.email;
    const user = await User.findOne({ email: userEmail });
    res.status(200).send({
        fullName: user.fullName,
        email: user.email
    });
});

export default profileRoutes;