import express from "express";
import {
  createParticipant,
  getAllParticipants,
  getParticipantById,
  addHealthData,
  deleteParticipant,
} from "../controllers/participant.js";

const router = express.Router();

router.get("/", getAllParticipants);
router.get("/:participantId", getParticipantById);
router.post("/", createParticipant);
router.delete("/:participantId", deleteParticipant);

router.post("/health/:id", addHealthData);

export default router;
