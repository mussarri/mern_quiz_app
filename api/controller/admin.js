import slugify from "slugify";
import Quiz from "../model/quiz.js";
import User from "../model/user.js";
import Result from "../model/result.js";

export const createQuiz = async (req, res) => {
  try {
    const { category, questions } = req.body;
    const name = slugify(req.body.name, "-");
    const questionsArray = JSON.parse(questions).questions;

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

export const getAllUsers = async (req, res) => {
  console.log("allUsers");
  try {
    const allUsers = await User.aggregate([
      { $project: { username: 1, email: 1, role: 1 } },
    ]);

    res.status(200).json({ allUsers });
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

export const getSingleUser = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.aggregate([
      {
        $project: {
          username: 1,
          email: 1,
          role: 1,
        },
      },
      {
        $match: {
          username: username,
        },
      },
    ]);

    res.status(200).json({ user });
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

export const getUserResults = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username: username });
    const userResults = await Result.aggregate([
      {
        $match: {
          userId: user._id,
        },
      },
      {
        $lookup: {
          from: Quiz.collection.name,
          localField: "quizId",
          foreignField: "_id",
          as: "quiz",
        },
      },
      {
        $project: {
          userAnswers: 1,
          userId: 1,
          totalPoint: 1,
          correctAnswer: 1,
          quiz: {
            category: 1,
            name: 1,
          },
        },
      },
    ]).exec();

    res.status(200).json({ userResults });
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

export const getSingleQuiz = async (req, res) => {
  try {
    const quizName = req.params.slug;
    const quiz = await Quiz.findOne({ name: quizName });
    res.status(200).json({ quiz });
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

export const editQuiz = async (req, res) => {
  try {
    const quizName = req.params.slug;
    const { category, questions } = req.body;
    const name = slugify(req.body.name, "-");
    const questionsArray = JSON.parse(questions).questions;

    const quiz = {
      name: name,
      category: category,
      questions: questionsArray,
      image: req.file?.filename || "",
    };
    const oldQuiz = await Quiz.findOne({ name: quizName });
    const newQuiz = await Quiz.findByIdAndUpdate(oldQuiz._id, quiz);
    res.status(200).json({ newQuiz });
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

export const deleteQuiz = async (req, res) => {
  try {
    const quizName = req.params.slug;
    const oldQuiz = await Quiz.findOne({ name: quizName });
    const deletedQuiz = await Quiz.findOne(oldQuiz._id);
    res.status(200).json({ deletedQuiz });
  } catch (error) {
    res.status(404).json({ message: error });
  }
};
