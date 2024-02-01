const jwt = require("jsonwebtoken");
const User = require("../database/models/userModel");
const AsyncHandler = require("express-async-handler");

const authProtect = AsyncHandler(async (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id);
      next();
    } catch (err) {
      console.log(err);
      res.status(401);
      throw new Error("User is not Authorized");
    }
  } else {
    res.status(401);
    throw new Error("User is not Authorized  and no token");
  }
});
module.exports = { authProtect };
