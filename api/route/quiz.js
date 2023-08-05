import express from "express";
import { dirname } from "path";
import multer from "multer";
import { fileURLToPath } from "url";
import { createQuiz, getAllQuiz,  getSingleQuizAnswers, getSingleQuizQuestion, saveResult } from "../controller/quiz.js";
import fs from 'node:fs'

const __filename = fileURLToPath(import.meta.url);

const __dirname = dirname(__filename);

// image upload
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    fs.mkdir('./uploads/',(err)=>{
        cb(null, './uploads/');
     });
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
  },
});

var upload = multer({ storage: storage });

const router = express.Router();
router.get("/", getAllQuiz);
router.get("/result", getSingleQuizAnswers);
router.post("/result", saveResult);
router.get("/:slug", getSingleQuizQuestion);
router.post("/", upload.single("image"), createQuiz);

export default router;
