const mongoose = require("mongoose");

const bookmarkSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    validate: {
      validator: (title) => title.length >= 1 && title.length <= 20,
      message: () =>
        "Title is required and must be between 1 and 20 characters.",
    },
  },
  url: {
    type: String,
    required: true,
    validate: {
      validator: (url) => {
        return /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?$/.test(url);
      },
      message: () =>
        "Please provide a valid URL (starting with http:// or https://).",
    },
  },
  description: {
    type: String,
    validate: {
      validator: (description) => !description || description.length <= 50,
      message: () => "Description cannot exceed 50 characters.",
    },
  },
  tags: {
    type: [String],
    required: true,
    validate: {
      validator: (tags) =>
        tags.length >= 1 &&
        tags.length <= 5 &&
        tags.every((tag) => tag.length >= 1 && tag.length <= 20),
      message: () =>
        "You must provide between 1 and 5 tags, each between 1 and 20 characters.",
    },
  },
  category: {
    type: String,
    validate: {
      validator: (category) => !category || category.length <= 20,
      message: () => "Category cannot exceed 20 characters.",
    },
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Bookmark = mongoose.model("Bookmark", bookmarkSchema);

module.exports = Bookmark;
