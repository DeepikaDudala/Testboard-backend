const AsyncHandler = require("express-async-handler");
const Test = require("../database/models/testModel");
exports.getAllTests = AsyncHandler(async (req, res) => {
  try {
    const tests = await Test.find().select("-questions");
    res.status(200).json({
      tests,
    });
  } catch (err) {
    res.status(400);
    throw new Error("failed to get all tests");
  }
});
exports.getTest = AsyncHandler(async (req, res) => {
  try {
    const test = await Test.findById(req.params.id).select(
      "-questions.correctAnswer"
    );
    if (!test) {
      res.status(404);
      throw new Error("Test not found");
    }
    res.status(200).json({
      test,
    });
  } catch (err) {
    res.status(400);
    throw new Error("failed to get test");
  }
});
exports.addTest = AsyncHandler(async (req, res) => {
  const { testName, questions } = req.body;
  if (!testName || !questions) {
    res.status(401);
    throw new Error("Test must contains testName, questions ");
  }
  try {
    const test = await Test.create({ testName, questions });
    res.status(201).json({
      status: "success",
      data: {
        test,
      },
    });
  } catch (err) {
    res.status(400);
    throw new Error(err);
  }
});
exports.deleteTest = AsyncHandler(async (req, res) => {
  try {
    const test = await Test.findByIdAndDelete(req.params.id);
    if (!test) {
      res.status(404).json({ message: "Test not found" });
      return;
    }
    res.status(200).json({
      status: "success",
    });
  } catch (err) {
    res.status(400);
    throw new Error("failed to delete test");
  }
});
