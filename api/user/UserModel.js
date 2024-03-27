const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const userSchema = new Schema(
  {
    name: String,
    registration_no: { type: String, unique: true },
    contact_no: { type: String },
    password: String,
    role: { type: String, enum: ["student", "teacher"] },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
