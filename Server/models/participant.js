import mongoose from "mongoose";

const participantSchema = new mongoose.Schema(
  {
    data: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
    healthRecords: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Health",
      },
    ],
  },
  {
    timestamps: true,
    strict: false,
  }
);

export default mongoose.model("Participant", participantSchema);
