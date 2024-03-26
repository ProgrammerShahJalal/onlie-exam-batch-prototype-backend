const { Schema, default: mongoose } = require("mongoose");

const examSchema = new Schema({
  title: {
    bangla: { type: String },
    english: { type: String },
  },
  date: { type: Date },
  time: { type: String },
  total_question: { type: Number, required: true },
  total_mark: { type: Number, required: true },
  per_wrong_ans_cut_mark: { type: Number, required: true, default: 0.25 },
  duration_in_minutes: { type: Number, required: true },
  questions: [{ type: Schema.Types.ObjectId, ref: "Question" }],
});

const Exam = mongoose.model("Exam", examSchema);

module.exports = Exam;
