import Participant from "../models/participant.js";
import Health from "../models/health.js";

export const createParticipant = async (req, res) => {
  try {
    const participant = new Participant({
      data: req.body.data,
    });
    await participant.save();
    res.status(201).json(participant);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const addHealthData = async (req, res) => {
  try {
    const participantId = req.params.id; 

    const healthRecord = new Health({
      data: req.body.data,
    });
    await healthRecord.save();

    const participant = await Participant.findByIdAndUpdate(
      participantId,
      { $push: { healthRecords: healthRecord._id } },
      { new: true }
    );

    if (!participant) {
      return res.status(404).json({ error: "Participant not found" });
    }

    res.json({ participant, healthRecord });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getAllParticipants = async (req, res) => {
  try {
    const participants = await Participant.find()
      .populate("healthRecords")
      .sort({ createdAt: -1 });
    res.json(participants);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getParticipantById = async (req, res) => {
  try {
    const participant = await Participant.findById(
      req.params.participantId
    ).populate("healthRecords");
    if (!participant) {
      return res.status(404).json({ error: "Participant not found" });
    }
    res.json(participant);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteParticipant = async (req, res) => {
  try {
    const participant = await Participant.findByIdAndDelete(
      req.params.participantId
    );
    if (!participant) {
      return res.status(404).json({ error: "Participant not found" });
    }
    
    await Health.deleteMany({ _id: { $in: participant.healthRecords } });
    res.json({ message: "Participant deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
