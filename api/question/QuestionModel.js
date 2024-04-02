const { Schema, default: mongoose, Types } = require("mongoose");

const questionSchema = new Schema({
  exam_id: { type: Types.ObjectId, required: true },
  serial_no: { type: Number, required: true },
  title: {
    bangla: { type: String },
    english: { type: String },
    image: { type: String },
  },
  options: [
    {
      name: { type: String, required: true, enum: ["a", "b", "c", "d"] },
      text: {
        bangla: { type: String },
        english: { type: String },
        image: { type: String },
      },
    },
  ],

  correct_option: { type: String, required: true },
  right_answer: { bangla: String, english: String },
  user_answer_count: {
    type: Map,
    of: Number,
    default: {},
  },
});

const Question = mongoose.model("Question", questionSchema);

module.exports = Question;
