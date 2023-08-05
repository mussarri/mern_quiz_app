import Quiz from "../model/quiz.js";
import slugify from "slugify";
import User from "../model/user.js";
import Result from "../model/result.js";

export const getAllQuiz = async (req, res) => {
  try {
    const allQuiz = await Quiz.find();
    res.status(200).json({ allQuiz });
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

export const getSingleQuizQuestion = async (req, res) => {
  try {
    const { slug } = req.params;
    const { trace } = req.query;
    const { name, category, image, questions } = await Quiz.findOne({
      name: slug,
    });
    const { desc, main, options } = questions[trace];
    const length = questions.length;

    res.status(200).json({
      name: name,
      category: category,
      image: image,
      length: length,
      question: { desc, main, options },
    });
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

export const getSingleQuizAnswers = async (req, res) => {
  try {
    const quizName = slugify(req.query.quizName);
    const quiz = await Quiz.findOne({ name: quizName });
    if (quiz) res.status(200).json({ quiz });
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

export const createQuiz = async (req, res) => {
  try {
    const { category, questions } = req.body;
    const name = slugify(req.body.name, "-");
    const questionsArray = JSON.parse(questions).questions;
    console.log(questionsArray);

    const quiz = {
      name: name,
      category: category,
      questions: questionsArray,
      image: req.file?.filename || "",
    };

    const newQuiz = await Quiz.create(quiz);
    res.status(200).json({ newQuiz });
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

export const saveResult = async (req, res) => {
 
  try {
    const { username, quizName, answers } = req.body;
    const quiz = await Quiz.findOne({ name: quizName });
    const user = await User.findOne({ username: username });
    console.log(answers);

    const newResult = await Result.create({
      quizId: quiz._id,
      userId: user._id,
      userAnswers: JSON.stringify(answers)
    });

    console.log(newResult);

    res.status(200).json({ newResult });
  } catch (error) {
    res.status(404).json({ message: error });
  }
};
