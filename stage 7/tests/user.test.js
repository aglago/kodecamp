import request from "supertest";
import app from "../server.js";
import mongoose from "mongoose";
import connectToDatabase from "../db/connectToDatabase.js";
import User from "../models/user.models.js";
import Product from "../models/product.models.js";
import Order from "../models/order.models.js";

describe("User Routes", () => {
  let userToken;
  let productId;
  let mockUser;

  beforeAll(async () => {
    await connectToDatabase();

    // Create a mock user
    mockUser = new User({
      fullName: "Test User",
      email: "user@test.com",
      password: "password123",
      role: "customer",
    });
    await mockUser.save();

    // Create a test product
    const product = await Product.create({
      name: "Test Product",
      description: "This is a test product",
      price: 9.99,
      quantity: 100,
      userId: mockUser._id,
    });
    productId = product._id;
  });

  afterAll(async () => {
    await User.deleteMany({});
    await Product.deleteMany({});
    await Order.deleteMany({});
    await mongoose.connection.close();
  });

  describe("Register", () => {
    it("should register a new user", async () => {
      const res = await request(app).post("/auth/register").send({
        fullName: "Test User",
        email: "user@example.com",
        password: "userpassword",
        role: "customer",
      });

      expect(res.statusCode).toBe(201);
      expect(res.body.message).toContain(
        "Registered Test User successfully as customer"
      );
    });
  });

  describe("Login", () => {
    it("should login a user", async () => {
      const res = await request(app).post("/auth/login").send({
        email: "user@example.com",
        password: "userpassword",
      });

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("token");
      userToken = res.body.token;
    });
  });

  describe("View products", () => {
    it("should return a list of products", async () => {
      const res = await request(app)
        .get("/products")
        .set("Authorization", `Bearer ${userToken}`)
        .set(
          "x-mock-user",
          JSON.stringify({ id: mockUser._id.toString(), role: "customer" })
        );

      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBeTruthy();
      expect(res.body.length).toBeGreaterThan(0);
    });
  });

  describe("View a single product", () => {
    it("should return details of a single product", async () => {
      const res = await request(app)
        .get(`/products/${productId}`)
        .set("Authorization", `Bearer ${userToken}`)
        .set(
          "x-mock-user",
          JSON.stringify({ id: mockUser._id.toString(), role: "customer" })
        );

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("name", "Test Product");
    });
  });

  describe("Checkout/creating an order", () => {
    it("should create a new order", async () => {
      const res = await request(app)
        .post("/orders")
        .set("Authorization", `Bearer ${userToken}`)
        .set(
          "x-mock-user",
          JSON.stringify({ id: mockUser._id.toString(), role: "customer" })
        )
        .send({
          orderItems: [
            {
              productId: productId,
              quantity: 2,
              totalPrice: 19.98,
            },
          ],
        });

      expect(res.statusCode).toBe(201);
      expect(res.body.message).toBe("Order added successfully");
      expect(res.body).toHaveProperty("order");

      // Test checkout
      const checkoutRes = await request(app)
        .post(`/orders/${res.body.order._id}/checkout`)
        .set("Authorization", `Bearer ${userToken}`)
        .set(
          "x-mock-user",
          JSON.stringify({ id: mockUser._id.toString(), role: "customer" })
        );

      expect(checkoutRes.statusCode).toBe(200);
      expect(checkoutRes.body.message).toBe("Checkout successful");
      expect(checkoutRes.body.order.status).toBe("Completed");
    });
  });
});
