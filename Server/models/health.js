import mongoose from "mongoose";

const healthSchema = new mongoose.Schema(
  {
    data: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
  },
  {
    timestamps: true,
    strict: false,
  }
);

export default mongoose.model("Health", healthSchema);
