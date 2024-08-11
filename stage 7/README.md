# E-commerce API

## Project Overview

This is a simple E-commerce API that allows customers to:
- Register and log in
- View all products or a single product
- Checkout and create orders

Admins can:
- Register and log in
- Add, edit, and delete products

## Environment Variables

Ensure you set the following environment variables in your `.env` file:

- `PORT`: The port the server runs on.
- `MONGODB_URI`: The connection string for your MongoDB database.
- `TEST_MONGODB_URI`: The connection string for your test MongoDB database.
- `SIGN_TOKEN`: The secret key used for signing JWT tokens.

## Routes

### Auth Routes

- `POST /auth/register`: Register a new user or admin.
- `POST /auth/login`: Login and receive a JWT token.

### Product Routes

- `GET /products`: View all products.
- `GET /products/:id`: View a single product by ID.
- `POST /products`: (Admin only) Add a new product.
- `POST /products/:id/edit`: (Admin only) Edit a product by ID.
- `DELETE /products/:id`: (Admin only) Delete a product by ID.

### Order Routes

- `POST /orders`: Create a new order (User only).
- `POST /orders/:id/checkout`: Checkout an order by ID (User only).

## Testing

This project uses Jest for testing. To run the tests:

```bash
npm test
