const { Schema, default: mongoose, Types } = require("mongoose");

const examSubmissionSchema = new Schema({
  exam_id: { type: Types.ObjectId, required: true },
  registration_no: { type: String, required: true },
  version: { type: String, required: true },
  submission: {
    type: Map,
    of: String,
    required: true,
  },
});

examSubmissionSchema.index(
  { exam_id: 1, registration_no: 1 },
  { unique: true }
);

const ExamSubmission = mongoose.model("ExamSubmission", examSubmissionSchema);

module.exports = ExamSubmission;
