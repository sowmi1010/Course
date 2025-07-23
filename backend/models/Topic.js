// models/Topic.js
import mongoose from "mongoose";

const exampleSchema = new mongoose.Schema({
  title: String,
  description: String,
  code: String,
});

const subtopicSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  syntax: String,
  examples: [exampleSchema],
});

const topicSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    subtitle: String,
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
    code: String,
    htmlCode: String,
    cssCode: String,
    jsCode: String,
    image: String,
    subtopics: [subtopicSchema],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    isFavorite: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("Topic", topicSchema);
