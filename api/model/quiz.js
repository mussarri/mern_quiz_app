import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  desc: { type: String },
  main: { type: String, required: true },
  options: [String],
  true: { type: Number, required: true },
});

const quizSchema = new mongoose.Schema(
  {
    name: { type: String, unique: true, required: true },
    userId: { type: mongoose.Types.ObjectId, ref: "User" },
    category: { type: String, required: true },
    time: Number,
    questions: [questionSchema],
  },
  { timestamps: true }
);

const Quiz = mongoose.model("quizSchema", quizSchema);

export default Quiz;
