const AsyncHandler = require("express-async-handler");

const protect = AsyncHandler(async (req, res, next) => {
  if (req.user.role != "student") {
    next();
  } else {
    res.status(401);
    throw new Error("Student is not authorized");
  }
});
module.exports = protect;
