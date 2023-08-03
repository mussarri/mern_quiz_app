import Quiz from "../model/quiz.js";

export const getAllQuiz = async (req, res) => {
  try {
    const allQuiz = await Quiz.find();
    res.status(200).json({ allQuiz });
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

export const createQuiz = async (req, res) => {
  try {
    const quiz = req.body
    console.log(quiz);
    const newQuiz = await Quiz.create(quiz);
    res.status(200).json({ newQuiz });
  } catch (error) {
    res.status(404).json({ message: error });
  }
};
