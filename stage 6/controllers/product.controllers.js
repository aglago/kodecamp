import Product from "../models/product.models.js";

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) return res.status(404).send({ message: "Product not found" });
    res.send(product);
  } catch (error) {
    console.log("Error in the getProductById controller: " + error.message);
    res.status(500).send({ message: "Failed to add product" });
  }
};

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.send(products);
  } catch (error) {
    console.log("Error in the getProducts controller: " + error.message);
    res.status(500).send({ message: "Failed to get products" });
  }
};

export const addProduct = async (req, res) => {
  try {
    const { name, description, price, quantity } = req.body;

    if (!name || !description || !price || !quantity) {
      return res.status(400).send({ message: "All fields are required" });
    }

    const product = new Product({
      name,
      description,
      price,
      quantity,
      userId: req.user.id,
    });
    await product.save();

    res.send({ message: "Product saved successfully", product });
  } catch (error) {
    console.log("Error in the addProduct controller: " + error.message);
    res.status(500).send({ message: "Failed to add product" });
  }
};

export const editProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price } = req.body;

    const product = await Product.findByIdAndUpdate(
      id,
      { name, description, price },
      { new: true }
    );
    if (!product) return res.status(404).send({ message: "Product not found" });

    res.send({ message: "Product edited successfully", product });
  } catch (error) {
    console.log("Error in the editProduct controller: " + error.message);
    res.status(500).send({ message: "Failed to add product" });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if the product belongs to the authenticated user
    const product = await Product.findById(id);
    if (!product) return res.status(404).send({ message: "Product not found" });

    if (product.userId.toString() !== req.user.id)
      return res.status(403).send({
        message: "Forbidden: You are not authorized to delete this product",
      });

    await Product.findByIdAndDelete(id);
    res.send("Product deleted successfully");
  } catch (error) {
    console.log("Error in the deleteProduct controller: " + error.message);
    res.status(500).send({ message: "Failed to add product" });
  }
};
