const jwt = require("jsonwebtoken");

const authenticateUser = (req, res, next) => {
  try {
    const token = req.cookies?.token;
    if (!token) throw new Error();
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const { _id } = decodedToken;
    req.user = { _id };
    next();
  } catch (err) {
    res.status(401).json({
      error: "Please login",
    });
  }
};

module.exports = {
  authenticateUser,
};
