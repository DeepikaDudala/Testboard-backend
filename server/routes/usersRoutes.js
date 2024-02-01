const express = require("express");
const router = express.Router();
const {
  getAllStudents,
  deleteUser,
} = require("../controllers/userControllers");
const { userRegister, userLogin } = require("../controllers/authController");
const protect = require("../middlewares/protect");
const { authProtect } = require("../middlewares/authProtect");

router.route("/register").post(userRegister);
router.route("/login").post(userLogin);
router.route("/getAllStudents").get(authProtect, protect, getAllStudents);
router.route("/deleteUser/:id").delete(authProtect, protect, deleteUser);
module.exports = router;
