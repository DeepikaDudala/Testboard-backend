const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A user requires a name"],
  },
  email: {
    type: String,
    required: [true, "A user need to specify an email"],
    unique: [true, "This email already exists"],
  },
  password: {
    type: String,
    required: [true, "A user needs to specify a password"],
    minlength: [9, "Password must be at least 9 characters"],
    maxlength: [15, "Password cannot exceed 15 characters"],
    select: false,
  },
  role: {
    type: String,
    default: "student",
    enum: ["admin", "teacher", "student"],
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    //bcrypt password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    return next();
  } catch (err) {
    return next(err);
  }
});

module.exports = mongoose.model("User", userSchema);
