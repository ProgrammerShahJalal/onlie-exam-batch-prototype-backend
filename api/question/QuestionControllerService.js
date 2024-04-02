const { Router } = require("express");
const Question = require("./QuestionModel");

const router = Router();

router.post("/", async (req, res) => {
  const payload = req.body;

  try {
    const response = await Question.create(payload);

    if (response) return res.json(response);
    else return res.send({ error: "Error creating question!" });

    return res.status(201).json({ data: response });
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
