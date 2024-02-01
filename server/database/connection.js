const mongoose = require("mongoose");
mongoose
  .connect(process.env.DATABASE)
  .then((connection) => console.log(`succesfully connected to database`))
  .catch((err) => console.log(err));
