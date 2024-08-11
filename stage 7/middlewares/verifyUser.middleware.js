import jwt from "jsonwebtoken";

const verifyUser = (req, res, next) => {
  if (process.env.NODE_ENV === "test" && req.headers["x-mock-user"]) {
    req.user = JSON.parse(req.headers["x-mock-user"]);
    return next();
  }
  
  try {
    // Make sure there is an authorization header in the request
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      res
        .status(403)
        .send({ message: "Unauthorized: No authorization header" });
      return;
    }

    // Extract the token from the authorization header
    const authToken = authHeader.split(" ");

    // Check if the token is present and if it starts with "Bearer"
    if (authToken.length != 2 || authToken[0] != "Bearer") {
      res.status(403).send({ message: "Unauthorized: No token provided" });
      return;
    }

    // Verify the token using the secret key
    const token = authToken[1];
    const user = jwt.verify(token, process.env.SIGN_TOKEN);
    if (!user) {
      res.status(403).send({ message: "Unauthorized: Invalid token" });
      return;
    }
    req.user = user;

    // Call the request that was called in request
    next();
  } catch (error) {
    console.log("Error in verifyUser middleware function:", error.message);
    res.status(500).send({ message: "Server error: Could not verify jwt" });
  }
};

export default verifyUser;
