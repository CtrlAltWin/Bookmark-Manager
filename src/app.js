const express = require("express");
const app = express();
const { connectDatabase } = require("./config/database");
const {bookmarkRouter} = require("./routes/bookmark")
app.use(express.json());
/*currently router is under development*/
app.use("/", bookmarkRouter);            
// app.use("/api/auth", authRouter);

connectDatabase()
  .then(() => {
    app.listen(7777, () => {
      console.log("server listening on port 7777");
    });
  })
  .catch((err) => {
    console.log("server is not listning");
  });
