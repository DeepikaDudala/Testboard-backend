const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");
const usersRoutes = require("./routes/usersRoutes");
const testRoutes = require("./routes/testsRoutes");
const resultsRoutes = require("./routes/resultsRoutes");
const errorHandler = require("./middlewares/errorHandler");
const cookieParser = require("cookie-parser");
app.use(
  cors({
    credentials: true,
    origin: process.env.FRONTEND_URL,
    methods: ["POST", "GET", "DELETE"],
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
if (process.env.NODE_ENV == "development") {
  app.use(morgan("tiny"));
}
app.use("/api/v1/users", usersRoutes);
app.use("/api/v1/tests", testRoutes);
app.use("/api/v1/results", resultsRoutes);

//Server frontend
// if (process.env.NODE_ENV == "production") {
//   app.use(express.static(path.join(__dirname, "../client/build")));
//   app.get("*", (req, res) =>
//     res.sendFile(
//       path.resolve(__dirnmae, "../", "client", "build", "index.html")
//     )
//   );
// }

app.use(errorHandler);
module.exports = app;
