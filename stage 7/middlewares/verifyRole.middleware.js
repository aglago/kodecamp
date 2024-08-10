const verifyRole = (role) => {
  return (req, res, next) => {
    if (req.user && req.user.role === role) {
      next();
    } // If user is not logged in or has insufficient role
    else
      return res
        .status(403)
        .json({ message: "Unauthorized: Insufficient role" });
  };
};

export default verifyRole;
