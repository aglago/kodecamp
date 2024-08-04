import Order from "../models/order.models.js";

export const addOrder = async (req, res) => {
  try {
    const { orderItems } = req.body;

    // validating order
    if (!orderItems)
      return res.status(400).send({ message: "No order items provided" });
    if (orderItems.length === 0)
      return res.status(400).send({ message: "No order items provided" });
    if (
      orderItems.some(
        (item) => !item.productId || !item.quantity || item.quantity <= 0
      )
    )
      return res.status(400).send({ message: "Invalid order item" });

    // calculating total price
    const totalPrice = orderItems.reduce(
      (total, item) => total + item.totalPrice,
      0
    );

    // creating order
    const order = await Order.create({
      userId: req.user._id,
      products: orderItems,
      totalPrice,
    });
    res.status(201).send({ message: "Order added successfully", order });
  } catch (error) {
    console.log("Error in the addOrder controller: " + error.message);
    res.status(500).send({ message: "Failed to add order" });
  }
};

export const checkout = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || !mongoose.Types.ObjectId.isValid(id))
      return res.status(400).send({ message: "No order ID provided" });

    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { status: "Completed" },
      { new: true }
    );
    if (!updatedOrder)
      return res.status(404).send({ message: "Order not found" });

    //TODO: Reduce product stock quantity

    res
      .status(200)
      .send({ message: "Checkout successful", order: updatedOrder });
  } catch (error) {
    console.log("Error in the checkout controller: " + error.message);
    res.status(500).send({ message: "Failed to checkout" });
  }
};
