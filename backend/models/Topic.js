import mongoose from "mongoose";

const topicSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    subtitle: { type: String },
    language: {
      type: String,
      required: true,
      enum: [
        "html",
        "css",
        "javascript",
        "react",
        "tailwind",
        "java",
        "python",
        "node",
        "express",
        "mongodb",
        "mysql",
      ],
    },
    code: { type: String },
    htmlCode: { type: String },
    cssCode: { type: String },
    jsCode: { type: String },
    image: { type: String },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        isFavorite: { type: Boolean, default: false },

  },
  { timestamps: true }
);

export default mongoose.model("Topic", topicSchema);
