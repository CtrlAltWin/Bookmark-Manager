const validateBookmark = (bookmark) => {
  const ALLOWED_CATEGORY = [
    "Learning",
    "Work",
    "Personal",
    "Entertainment",
    "Other",
  ];
  const { title, url, description, tags, category } = bookmark;
  if (!title || title.length < 1 || title.length > 20) {
    throw new Error("Title must be between 1 and 20 characters.");
  }
  if (!url || !/^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?$/.test(url)) {
    throw new Error("Please enter a valid URL.");
  }
  if (description && description.length > 50) {
    throw new Error("Description must be 50 characters or fewer.");
  }
  if (
    !tags ||
    tags.length < 1 ||
    tags.length > 5 ||
    tags.some((tag) => tag.length > 20)
  ) {
    throw new Error(
      "You can add up to 5 tags, and each tag must be 20 characters or fewer."
    );
  }
  if (!category || !ALLOWED_CATEGORY.includes(category)) {
    throw new Error("Please select a valid category.");
  }
};

module.exports = {
  validateBookmark,
};
