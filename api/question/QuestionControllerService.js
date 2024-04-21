const { Router } = require("express");
const Question = require("./QuestionModel");
const Exam = require("../exam/ExamModel");

const router = Router();

router.post("/", async (req, res) => {
  const payload = req.body;

  try {
    const exam = await Exam.findById(payload.exam_id);
    if (!exam) return res.send({ error: "Error exam id provided!" });

    const existingQuestionCountToThisExam = await Question.countDocuments({
      exam_id: payload.exam_id,
    });

    if (existingQuestionCountToThisExam >= exam?.total_question)
      return res.send({ error: "Already all questions added to this exam!" });

    const response = await Question.create(payload);
    if (response) return res.json(response);
    else return res.send({ error: "Error creating question!" });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/:question_id", async (req, res) => {
  const { question_id } = req.params;

  const response = await Question.deleteOne({ _id: question_id });
  if (response) res.json(response);
  else res.send({ error: "Error creating question!" });

  return res.status(201).json({ data: response });
});

module.exports = router;
