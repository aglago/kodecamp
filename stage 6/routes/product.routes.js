import express from "express";
import {
  addProduct,
  editProduct,
  deleteProduct,
  getProducts,
  getProductById,
} from "../controllers/product.controllers.js";
import verifyRole from "../middlewares/verifyRole.middleware.js";

const router = express.Router();

router.get("/", getProducts);
router.get("/:id", getProductById);

router.use(verifyRole("admin"));

router.post("/", addProduct);
router.post("/:id/edit", editProduct);
router.post("/:id/delete", deleteProduct);

export default router;
