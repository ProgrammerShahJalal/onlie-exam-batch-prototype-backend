const { Schema, default: mongoose } = require("mongoose");

const examSchema = new Schema({
  title: { type: String, required: true },
  start: {
    date: Date,
    time: String,
  },
  end: {
    date: Date,
    time: String,
  },
  total_question: { type: Number, required: true },
  total_mark: { type: Number, required: true },
  per_wrong_ans_cut_mark: { type: Number, required: true, default: 0.25 },
  duration_in_minutes: { type: Number, required: true },
  is_live: { type: Boolean, default: false },
  questions: [{ type: Schema.Types.ObjectId, ref: "Question" }],
});

const Exam = mongoose.model("Exam", examSchema);

module.exports = Exam;
