const AsyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../database/models/userModel");

const userRegister = AsyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;
  if (!email || !name || !password) {
    res.status(400);
    throw new Error("please fill all fields");
  }

  try {
    let user;
    if (!role) {
      user = await User.create({ name, email, password });
    } else {
      user = await User.create({ name, email, password, role });
    }
    res.status(200).json({
      _id: user._id,
      email: user.email,
      role: user.role,
      token: createToken(user._id),
    });
  } catch (err) {
    res.status(400);
    throw new Error(err);
  }
});
const userLogin = AsyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("Please fill all fields");
  }

  try {
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      res.status(400);
      throw new Error("User not found");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(400);
      throw new Error("Invalid password");
    }

    res.status(200).json({
      _id: user._id,
      email: user.email,
      role: user.role,
      token: createToken(user.id),
    });
  } catch (err) {
    res.status(400);
    throw err;
  }
});

const setPassword = AsyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("Please fill all fields");
  }
  if (password.length < 9 || password.length > 15) {
    res.status(400);
    throw new Error("Password must be between 9 and 15 characters");
  }

  try {
    let user = await User.findOne({ email });
    if (!user) {
      res.status(400);
      throw new Error("User not found");
    }
    user = await User.findOneAndUpdate(
      { email }, { password }, { new: true })
    res.status(200).json({
      _id: user._id,
      email: user.email,
      role: user.role,
      token: createToken(user.id),
    });
  } catch (err) {
    res.status(400);
    throw err;
  }
})

const createToken = (id) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
  return token;
};

module.exports = { userLogin, userRegister, setPassword };
