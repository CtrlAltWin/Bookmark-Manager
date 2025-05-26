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

bookmarkRouter.get("/api/bookmark", async (req, res) => {
  try {
    const userId = "64f8c9e2a4c8b123456789ab";
    const { search, tags, category } = req.query;
    const query = {
      userId,
    };
    if (search)
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    if (tags) query.tags = { $in: tags.split(",") };
    if (category) query.category = category;
    const bookmarks = await Bookmark.find(query);
    res.json(bookmarks);
  } catch (err) {
    res.status(400).json({ error: err.message || "error finding bookmarks" });
  }
});

bookmarkRouter.delete("/api/bookmark/:id", async (req, res) => {
  try {
    const userId = "64f8c9e2a4c8b123456789ab";
    const { id } = req.params;
    const deleted = await Bookmark.findOneAndDelete({ _id: id, userId });
    if (!deleted) {
      return res
        .status(404)
        .json({ error: "Bookmark not found or unauthorized" });
    }
    res.json({ deleted, message: "bookmark deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message || "Error deleting bookmark" });
  }
});

module.exports = {
  bookmarkRouter,
};
