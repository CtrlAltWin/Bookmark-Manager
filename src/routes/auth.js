const express = require("express");
const authRouter = express.Router();
const { validateSignupData } = require("../utils/validation");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

authRouter.post("/api/auth/signup", async (req, res) => {
  try {
    validateSignupData(req.body);
    const { username, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error("User already exists");
    }
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

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "5h",
    });
    res.cookie("token", token, { maxAge: 5 * 60 * 60 * 1000 });

    res.json({
      user: { username: user.username, email },
      message: "User logged in successfully",
    });
  } catch (err) {
    res.status(400).json({ error: err.message || "Error loggin in the user" });
  }
});

authRouter.post("/api/auth/logout", async (req, res) => {
  try {
    res.cookie("token", "", {
      maxAge: 0,
    });
    res.json({ message: "User logged out successfully" });
  } catch (err) {
    res
      .status(400)
      .json({ error: err.message || "Error logging out the user" });
  }
});

module.exports = {
  authRouter,
};
