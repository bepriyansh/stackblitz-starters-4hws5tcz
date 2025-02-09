import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

const JWT_SECRET = "hellohowareyou";

export const signup = async (req, res) => {
  try {
    console.log("Request body:", req.body); // Add this debug log

    const { email, password, role = "user" } = req.body;

    console.log("Parsed values:", { email, password, role }); // Add this debug log

    if (!email || !password) {
      return res.status(400).json({
        error: "Email and password are required",
        receivedData: req.body, // Add this to see what data was received
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create new user
    const user = new User({
      email,
      password: hashedPassword,
      role: role || "user", // Default to 'user' if no role specified
    });

    await user.save();

    // Create token
    const token = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET, {
      expiresIn: "24h",
    });

    res.status(201).json({
      message: "User created successfully",
      token,
      role: user.role,
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({
      error: "Error creating user",
      message: error.message, // Removed process.env check
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET, {
      expiresIn: "24h",
    });

    res.json({ token, role: user.role });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
