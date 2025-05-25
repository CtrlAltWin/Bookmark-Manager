const express = require("express");
const bookmarkRouter = express.Router();
const Bookmark = require("../models/bookmark");

bookmarkRouter.post("/api/bookmark/create", (req, res)=>{
    validateBookmark(req.body);
    const userId = 101;
    const bookmark = {...req.body, userId};


})