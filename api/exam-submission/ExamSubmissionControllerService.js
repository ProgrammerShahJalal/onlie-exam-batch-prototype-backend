const { Router } = require("express");
const ExamSubmission = require("./ExamSubmissonModel");

const router = Router();

router.post("/", async (req, res) => {
  const payload = req.body;

  try {
    const examSubmission = ExamSubmission.create({ ...payload });
    if (!examSubmission) {
      return res.status(400).json({ error: "Failed to create submission" });
    }

    return res.json({ data: "Exam successfully  submitted." });
  } catch (error) {
    return res.json({ error: "Something went wrong!" });
  }
});

router.get(
  "/is-submitted/registration_no/:registration_no/exam/:exam_id",
  async (req, res) => {
    const { exam_id, registration_no } = req.params;

    const isSubmitted = await ExamSubmission.findOne({
      exam_id,
      registration_no,
    });
    if (isSubmitted) {
      return res.json({ status: true });
    } else {
      return res.json({ status: false });
    }
  }
);

router.get(
  "/registration_no/:registration_no/exam/:exam_id",
  async (req, res) => {
    const { registration_no, exam_id } = req.params;

    try {
      const examSubmission = await ExamSubmission.findOne({
        registration_no,
        exam_id,
      });

      return res.json(examSubmission);
    } catch (error) {
      return res.json({ error: "Something went wrong!" });
    }
  }
);

module.exports = router;
