import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import routes from "./routes.js";

const app = express();
const PORT = process.env.PORT || 2025;
const MONGODB_URI =
  "mongodb+srv://ashutosh:ashutosh@cluster0.bppcfxz.mongodb.net/";

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database connection
mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/api", routes);

// Basic error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: "Something broke!",
    message: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Not Found" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
