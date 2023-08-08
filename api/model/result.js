import mongoose from "mongoose";

const resultSchema = new mongoose.Schema(
  {
    quizId: { type: mongoose.Types.ObjectId, ref: "quizSchema" },
    userId: { type: mongoose.Types.ObjectId, ref: "User" },
    correctAnswer: Number,
    totalPoint: Number,
    createdAt: { type: Date, default: Date.now() },
  },
  { timestamps: true }
);

const Result = mongoose.model("Result", resultSchema);

export default Result;
