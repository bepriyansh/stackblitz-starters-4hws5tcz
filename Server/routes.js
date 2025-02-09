import express from "express";
import userRoutes from "./routes/user.js";
import participantRoutes from "./routes/participant.js";

const router = express.Router();

// Auth routes
router.use("/auth", userRoutes);

// Participant and health routes
router.use("/participants", participantRoutes);

export default router;
