const express = require("express");
const app = express();
require("dotenv").config();
const { connectDatabase } = require("./config/database");
const { bookmarkRouter } = require("./routes/bookmark");
const { authRouter } = require("./routes/auth");
const cookieParser = require("cookie-parser");
app.use(express.json());
app.use(cookieParser());

const cors = require("cors");
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use("/", bookmarkRouter);
app.use("/", authRouter);

connectDatabase()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("server is listening");
    });
  })
  .catch((err) => {
    console.log("server is not listning");
    console.log(err.message);
  });
