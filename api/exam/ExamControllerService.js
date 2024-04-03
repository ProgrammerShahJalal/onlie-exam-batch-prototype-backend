const { Router } = require("express");
const Exam = require("./ExamModel");
const Question = require("../question/QuestionModel");

const router = Router();

router.post("/", async (req, res) => {
  const payload = req.body;
  try {
    const response = await Exam.create(payload);

    if (response) return res.json(response);
    else res.send({ error: "Error creating exam!" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const exams = await Exam.find({});

    if (exams) return res.json(exams);
    else res.send({ error: "No exams found." });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/:exam_id/questions/:version", async (req, res) => {
  const exam_id = req.params.exam_id;
  const version = req.params.version;

  try {
    if (version === "bangla") {
      const questions = await Question.find({ exam_id })
        .select("-title.english -right_answer.english -options.text.english")
        .sort({ serial_no: 1 });
      return res.json(questions);
    } else if (version === "english") {
      const questions = await Question.find({ exam_id })
        .select("-title.bangla -right_answer.bangla -options.text.bangla")
        .sort({ serial_no: 1 });
      return res.json(questions);
    } else {
      return res.json({ error: "Invalid parameter 'version'" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/:exam_id/last-question-serial", async (req, res) => {
  const { exam_id } = req.params;

  try {
    const lastSerial = await Question.findOne({ exam_id })
      .select("serial_no")
      .sort("-serial_no");
    // .limit(1);

    if (!lastSerial) return res.json({ serial_no: 0 });
    else return res.json(lastSerial);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/:exam_id", async (req, res) => {
  const { exam_id } = req.params;

  try {
    const exam = await Exam.findById(exam_id);
    if (!exam) return res.status(404).json({ error: "Exam not found." });

    return res.json(exam);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.patch("/:exam_id", async (req, res) => {
  const { exam_id } = req.params;
  const payload = req.body;

  try {
    const exam = await Exam.findByIdAndUpdate({ _id: exam_id }, payload, {
      new: true,
    });
    if (!exam) return res.status(404).json({ error: "Exam not found." });

    return res.json(exam);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/:exam_id", async (req, res) => {
  const { exam_id } = req.params;

  try {
    const exam = await Exam.findByIdAndDelete(exam_id);
    if (!exam) return res.status(404).json({ error: "Exam not found." });

    return res.json(exam);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
