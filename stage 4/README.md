# User Authentication API

This API provides endpoints for user registration, login, forgot password, reset password, and accessing protected user profile details.

## Endpoints

### Register User

**POST /api/register**

Registers a new user with the provided full name, email, and password.

Request Body:
```json
{
  "fullName": "John Doe",
  "email": "john.doe@example.com",
  "password": "your_password"
}
```

### User Login

**POST /api/login**

Logs in a user with email and password, issues an authentication token upon successful login.

Request Body:
```json
{
  "email": "john.doe@example.com",
  "password": "your_password"
}
```

Response:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Forgot Password

**POST /api/forgot-password**

Initiates the forgot password process by sending a unique token to the user's email.

Request Body:
```json
{
  "email": "john.doe@example.com"
}
```

### Reset Password

**POST /api/reset-password**

Resets the user's password using the unique token and sets a new password.

Request Body:
```json
{
  "token": "unique_reset_token",
  "newPassword": "new_password"
}
```

### Protected Route - User Profile

**GET /api/profile**

Fetches the user's profile details using the authentication token provided in the Authorization header.

Request Header:
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

Response:
```json
{
  "fullName": "John Doe",
  "email": "john.doe@example.com"
}
```

## Notes

- Passwords are securely hashed before storage using bcrypt.
- Authentication tokens are issued using JWT (JSON Web Token).
- Unique tokens for forgot password are generated using UUIDv4.
- Errors and validations have properly been handled for each endpoint.
