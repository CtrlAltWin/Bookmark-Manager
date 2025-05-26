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
    res.json({
      user: { username, email },
      message: "User signed up successfully",
    });
  } catch (err) {
    res.status(400).json({ error: err.message || "Error signingup the user" });
  }
});

authRouter.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      throw new Error("Invalid Email");
    }
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("Invalid Credentials");
    }
    const isPasswordMatching = await bcrypt.compare(password, user.password);
    if (!isPasswordMatching) {
      throw new Error("Invalid Credentials");
    }
    res.json({
      user: { username: user.username, email },
      message: "User signed up successfully",
    });
  } catch (err) {
    res.status(400).json({ error: err.message || "Error loggin in the user" });
  }
});

module.exports = {
  authRouter,
};
