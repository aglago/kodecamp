import express from "express";
import { addOrder, checkout } from "../controllers/order.controllers.js";

const router = express.Router();

router.post("/", addOrder);
router.post("/:id/checkout", checkout);

export default router;