import express from "express";
import register from "../controllers/register.controller.js";
import login from "../controllers/login.controller.js";
import forgotPassword from "../controllers/forgotPassword.controller.js";
import resetPassword from "../controllers/resetPassword.controller.js";

const authRoutes = express.Router();

authRoutes.post('/register', register);
authRoutes.post('/login', login);
authRoutes.post('/forgot_password', forgotPassword);
authRoutes.post('/reset_password', resetPassword);

export default authRoutes