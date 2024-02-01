const AsyncHandler = require("express-async-handler");
const User = require("../database/models/userModel");

const getAllStudents = AsyncHandler(async (req, res) => {
  try {
    const students = await User.find({ role: "student" });
    res.status(200).json({
      status: "success",
      count: students.length,
      data: {
        students,
      },
    });
  } catch (err) {
    res.status(400);
    throw new Error(err);
  }
});
const deleteUser = AsyncHandler(async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      res.status(400);
      throw new Error("cannot find user");
    }
    res.status(204).json({
      status: "success",
    });
  } catch (err) {
    res.status(400);
    throw new Error("cannot find user");
  }
});

module.exports = { getAllStudents, deleteUser };
