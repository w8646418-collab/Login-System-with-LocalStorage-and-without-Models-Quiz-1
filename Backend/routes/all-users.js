import express from "express";
import User from "../models/User.js";

const router = express.Router();

// POST /api/register
router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: "Email and password are required." });

    const existing = await User.findOne({ email });
    if (existing)
      return res.status(400).json({ message: "User already exists!" });

    // Save password directly (no hashing)
    const user = new User({ email, password });
    await user.save();

    return res.status(201).json({ message: "User registered successfully!" });
  } catch (err) {
    console.error("Register error:", err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
});

// POST /api/login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: "Email and password are required." });

    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "User not found. Please register first." });

    // Plain password check
    if (user.password !== password)
      return res.status(400).json({ message: "Invalid password." });

    return res.json({ message: "Login successful!", user });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
});

export default router;
