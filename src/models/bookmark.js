const mongoose = require("mongoose");

const bookmarkSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    validate: {
      validator: (title) => title.length <= 20,
      message: () => "Maximum length of title can be 20",
    },
  },
  url: {
    type: String,
    required: true,
    validate: {
      validator: (url) => {
        return /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?$/.test(url);
      },
      message: () => `Url is not a valid URL`,
    },
  },
  description: {
    type: String,
    validate: {
      validator: (description) => description.length <= 50,
      message: () => "Maximum length of description can be 50",
    },
  },
  tags: {
    type: [String],
    validate: {
      validator: (tags) =>
        tags.every((tag) => tag.length <= 20) && tags.length <= 5,
      message: () =>
        "Maximum number of tags can be 5 and length of each tag can be 20",
    },
  },
  category: {
    type: String,
    validate: {
      validator: (value) => value.length <= 20,
      message: () => "Maximum length of category can be 20",
    },
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Bookmark = mongoose.model("Bookmark", bookmarkSchema);

module.exports = Bookmark;
