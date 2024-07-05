import express from "express";
import register from "../controllers/register.controller.js";
import login from "../controllers/login.controller.js";

const authRoutes = express.Router();

authRoutes.post('/register', register);
authRoutes.post('/login', login);

export default authRoutes