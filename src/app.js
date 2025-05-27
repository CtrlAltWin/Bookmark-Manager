const express = require("express");
const app = express();
require("dotenv").config();
const { connectDatabase } = require("./config/database");
const { bookmarkRouter } = require("./routes/bookmark");
const cookieParser = require("cookie-parser");
app.use(express.json());
app.use(cookieParser());

/*currently router is under development*/
app.use("/", bookmarkRouter);
// app.use("/api/auth", authRouter);

connectDatabase()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("server is listening");
    });
  })
  .catch((err) => {
    console.log("server is not listning");
  });
