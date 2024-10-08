import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import connectToDatabase from "./db/connectToDatabase.js";
import verifyUser from "./middlewares/verifyUser.middleware.js";
import ordersRoutes from "./routes/order.routes.js"
import productRoutes from "./routes/product.routes.js"

dotenv.config();

// Create a server
const app = express();

app.use(express.json());

app.use("/auth", authRoutes);
app.use(verifyUser);
app.use("/orders", ordersRoutes);
app.use("/products", productRoutes);

// Use json format
app.use(express.json());

// GET request for home
app.get("/", function (req, res) {
  res.send("Welcome to My Kodecamp 4.0 Stage 6 Assignment");
});

export default app;

// Listen for requests
let server; // Hold the server instance

const startServer = () => {
  server = app.listen(process.env.PORT, () => {
    console.log("Server running on port", process.env.PORT);
    connectToDatabase();
  });
};

const stopServer = () => {
  return new Promise((resolve) => {
    if (server) {
      server.close(resolve); // Close the server
    } else {
      resolve();
    }
  });
};

export { startServer, stopServer };
