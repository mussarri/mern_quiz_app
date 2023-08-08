import Quiz from "../model/quiz.js";
import slugify from "slugify";
import User from "../model/user.js";
import Result from "../model/result.js";

export const getAllQuiz = async (req, res) => {
  try {
    const allQuiz = await Quiz.aggregate([
      {
        $project: {
          name: 1,
          image: 1,
          category: 1,
          length: { $size: "$questions" },
        },
      },
    ]).exec();
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
    const quiz = await Quiz.findOne({ name: quizName }).select({
      quesitons: 1,
      name: 0,
      category: 0,
      image: 0,
    });
    if (quiz) res.status(200).json({ quiz });
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

export const saveResult = async (req, res) => {
  try {
    const { result, correctAnswer, totalPoint } = req.body;
    const { username, quizName } = result;
    const quizId = await Quiz.findOne({ name: quizName }).select("_id");
    const userId = await User.findOne({ username: username }).select("_id");

    const newResult = await Result.create({
      quizId: quizId,
      userId: userId,
      totalPoint: totalPoint,
      correctAnswer: correctAnswer,
    });

    res.status(200).json({ newResult });
  } catch (error) {
    res.status(404).json({ message: error });
  }
};
