const express = require("express");
const bookmarkRouter = express.Router();
const Bookmark = require("../models/bookmark");
const { validateBookmark } = require("../utils/validation");
bookmarkRouter.post("/api/bookmark", async (req, res) => {
  try {
    validateBookmark(req.body);
    const userId = "64f8c9e2a4c8b123456789ab";
    const bookmark = new Bookmark({ ...req.body, userId });
    await bookmark.save();
    res.json({
      bookmark,
      message: "bookmark saved successfully.",
    });
  } catch (err) {
    res
      .status(400)
      .json({ error: err.message || "Error saving the bookmark." });
  }
});

// bookmarkRouter.get("/api/bookmark", async(req, res)=> {

// })
module.exports = {
  bookmarkRouter,
};
