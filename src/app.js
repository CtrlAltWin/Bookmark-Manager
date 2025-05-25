const express = require("express");
const app = express();
const { connectDatabase } = require("./config/database");

/*currently router is under development*/
// app.use("/api/bookmark", bookmarkRouter);            
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
