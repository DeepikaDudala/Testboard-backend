const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "A result must have a student"],
  },
  studentName: String,
  testName: String,
  testId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Test",
    required: [true, "A result must be associated with a test"],
  },
  total: {
    type: Number,
    ref: "Test",
  },
  scored: {
    type: Number,
    required: [true, "A score must be provided"],
  },
  percentage: {
    type: Number,
  },
  details: [
    {
      question: String,
      correctAnswer: String,
      yourAnswer: String,
      options: [String],
    },
  ],
});

module.exports = mongoose.model("Result", resultSchema);
