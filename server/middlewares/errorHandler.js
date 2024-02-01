const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  res.status(statusCode);
  let message = err.message;
  if (err.message.startsWith("MongoServerError")) {
    message = "Already Exists";
  } else if (err.message.startsWith("ValidationError")) {
    message = err.message.split(" ").slice(2).join(" ");
  }
  res.json({
    message,
    stack: err.stack,
  });
  next();
};

module.exports = errorHandler;
