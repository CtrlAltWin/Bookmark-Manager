const express = require("express");
const authRouter = express.Router();
const { validateSignupData } = require("../utils/validation");
const bcrypt = require("bcrypt");
const User = require("../models/user");

authRouter.post("/api/auth/signup", async (req, res) => {
  try {
    validateSignupData(req.body);
    const { username, email, password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    const user = new User({
      username,
      email,
      password: passwordHash,
    });
    await user.save();
    res.json({ user, message: "User signed up successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message || "Error signingup the user" });
  }
});

module.exports = {
  authRouter,
};
