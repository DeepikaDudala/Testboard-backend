const mongoose = require("mongoose");

const testSchema = new mongoose.Schema({
  testName: {
    type: String,
    required: [true, "A test must have a name"],
  },

  duration: {
    type: Number,
    default: function () {
      return this.questions.length;
    },
  },
  questions: [
    {
      text: {
        type: String,
        required: [true, "A question must have text"],
      },
      options: [String],
      correctAnswer: {
        type: String,
        required: [true, "Please provide the index of the correct answer"],
      },
    },
  ],
  totalMarks: {
    type: Number,
    default: function () {
      return this.questions.length;
    },
  },
});

module.exports = mongoose.model("Test", testSchema);
