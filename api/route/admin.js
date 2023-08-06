import express from "express";
import multer from "multer";
import { getAllQuiz } from "../controller/quiz.js";
import {
  createQuiz,
  deleteQuiz,
  editQuiz,
  getAllUsers,
  getSingleQuiz,
  getSingleUser,
  getUserResults,
} from "../controller/admin.js";
import fs from "node:fs";

// image upload
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    fs.mkdir("./uploads/", (err) => {
      cb(null, "./uploads/");
    });
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
  },
});
var upload = multer({ storage: storage });

const router = express.Router();
router.get("/users", getAllUsers);
router.get("/user/:username", getSingleUser);
router.get("/user/:username/results", getUserResults);
router.get("/quizzes", getAllQuiz);
router.post("/create", upload.single("image"), createQuiz);
router.get("/quizzes/:slug", getSingleQuiz);
router.delete("/quizzes/:slug", deleteQuiz);
router.patch("/quizzes/:slug/edit", editQuiz);

export default router;
