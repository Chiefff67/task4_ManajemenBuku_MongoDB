import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";

const JWT_SECRET = "syarif";

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log("Register endpoint hit");
    console.log("Request body:", req.body);

    const { username, password } = req.body;

    if (!username || !password) {
      console.log("Missing username or password");
      res.status(400).json({ error: "Username and password are required" });
      return;
    }

    // cek apakah username sudah ada
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      console.log("Username already exists:", username);
      res.status(400).json({ error: "Username already exists" });
      return;
    }

    // membuat user baru
    const user = new User({ username, password });
    await user.save();
    console.log("User created successfully:", username);

    // Generate token
    const token = jwt.sign({ userId: user._id }, JWT_SECRET);
    res.status(201).json({ token });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ error: "Server error during registration" });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log("Login endpoint hit");
    console.log("Request body:", req.body);

    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      console.log("User not found:", username);
      res.status(401).json({ error: "Invalid credentials" });
      return;
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      console.log("Invalid password for user:", username);
      res.status(401).json({ error: "Invalid credentials" });
      return;
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET);
    console.log("Login successful:", username);
    res.json({ token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

export default { register, login };