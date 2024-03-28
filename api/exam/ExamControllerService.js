const { Router } = require("express");
const Exam = require("./ExamModel");

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
