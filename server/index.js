const app = require("./app");
const port = process.env.PORT || 4000;
//database
require("./database/connection");

//server
app.listen(port, () => {
  console.log(`server listening at port ${port}`);
});
