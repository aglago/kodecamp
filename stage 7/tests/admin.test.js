import request from "supertest";
import app from "../server.js";
import mongoose from "mongoose";
import connectToDatabase from "../db/connectToDatabase.js";
import User from "../models/user.models.js";
import Product from "../models/product.models.js";

describe("Admin Routes", () => {
  let adminToken;
  let productId;
  let mockUser;

  beforeAll(async () => {
    await connectToDatabase();

    // Create a mock admin user
    mockUser = new User({
      fullName: "Test Admin",
      email: "admin@test.com",
      password: "password123",
      role: "admin",
    });
    await mockUser.save();
  });

  afterAll(async () => {
    await User.deleteMany({});
    await Product.deleteMany({});
    await mongoose.connection.close();
  });

  describe("Register", () => {
    it("should register a new admin", async () => {
      const res = await request(app).post("/auth/register").send({
        fullName: "Admin User",
        email: "admin@example.com",
        password: "adminpassword",
        role: "admin",
      });

      expect(res.statusCode).toBe(201);
      expect(res.body.message).toContain(
        "Registered Admin User successfully as admin"
      );
    });
  });

  describe("Login", () => {
    it("should login an admin", async () => {
      const res = await request(app).post("/auth/login").send({
        email: "admin@example.com",
        password: "adminpassword",
      });

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("token");
      adminToken = res.body.token;
    });
  });

  describe("Adding a product", () => {
    it("should add a new product", async () => {
      const res = await request(app)
        .post("/products")
        .set("Authorization", `Bearer ${adminToken}`)
        .set(
          "x-mock-user",
          JSON.stringify({ id: mockUser._id.toString(), role: "admin" })
        )
        .send({
          name: "Test Product",
          description: "This is a test product",
          price: 9.99,
          quantity: 100,
        });

      expect(res.statusCode).toBe(200);
      expect(res.body.message).toBe("Product saved successfully");
      expect(res.body).toHaveProperty("product");
      productId = res.body.product._id;
    });
  });

  describe("Adding a second product", () => {
    it("should add a second product", async () => {
      const res = await request(app)
        .post("/products")
        .set("Authorization", `Bearer ${adminToken}`)
        .set(
          "x-mock-user",
          JSON.stringify({ id: mockUser._id.toString(), role: "admin" })
        )
        .send({
          name: "Second Test Product",
          description: "This is another test product",
          price: 19.99,
          quantity: 50,
        });

      expect(res.statusCode).toBe(200);
      expect(res.body.message).toBe("Product saved successfully");
      expect(res.body).toHaveProperty("product");
    });
  });

  describe("Editing a product", () => {
    it("should edit the second product", async () => {
      const res = await request(app)
        .post(`/products/${productId}/edit`)
        .set("Authorization", `Bearer ${adminToken}`)
        .set(
          "x-mock-user",
          JSON.stringify({ id: mockUser._id.toString(), role: "admin" })
        )
        .send({
          name: "Updated Test Product",
          description: "This is an updated test product",
          price: 14.99,
        });

      expect(res.statusCode).toBe(200);
      expect(res.body.message).toBe("Product edited successfully");
      expect(res.body.product.name).toBe("Updated Test Product");
    });
  });

  describe("Deleting a product", () => {
    it("should delete the second product", async () => {
      const res = await request(app)
        .delete(`/products/${productId}`)
        .set("Authorization", `Bearer ${adminToken}`)
        .set(
          "x-mock-user",
          JSON.stringify({ id: mockUser._id.toString(), role: "admin" })
        );

      expect(res.statusCode).toBe(200);
      expect(res.body.message).toBe("Product deleted successfully");
    });
  });
});
