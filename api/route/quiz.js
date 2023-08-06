import express from "express";

import {
  getAllQuiz,
  getSingleQuizAnswers,
  getSingleQuizQuestion,
  saveResult,
} from "../controller/quiz.js";

const router = express.Router();
router.get("/", getAllQuiz);
router.get("/result", getSingleQuizAnswers);
router.post("/result", saveResult);
router.get("/:slug", getSingleQuizQuestion);

export default router;
