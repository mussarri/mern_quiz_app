import express from "express";
import Quiz from "../model/quiz.js";
import { createQuiz, getAllQuiz } from "../controller/quiz.js";

const router = express.Router();
router.get("/", getAllQuiz);
router.post("/", createQuiz);
export default router;
