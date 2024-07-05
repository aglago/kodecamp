import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import connectToDatabase from "./db/connectToDatabase.js";

dotenv.config();

// Create a server
const app = express();

app.use(express.json());

app.use("/auth", authRoutes);

// Use json format
app.use(express.json());

// GET request for home
app.get("/", function (req, res) { 
  res.send("Welcome to My Kodecamp 4.0 Stage 4 Assignment");
})

// Listen for requests
app.listen(process.env.PORT, () => {
  console.log("Server running on port", process.env.PORT);
  connectToDatabase();
});
