const express = require("express");
const router = express.Router();
const protect = require("../middlewares/protect");
const {
  getAllTests,
  getTest,
  addTest,
  deleteTest,
} = require("../controllers/testControllers");
const { authProtect } = require("../middlewares/authProtect");
const { createResult } = require("../controllers/resultControllers");

router.route("/").get(getAllTests);
router.route("/:id").get(authProtect, getTest);
router.post("/:id/createResult", authProtect, createResult);

router.route("/addTest").post(authProtect, protect, addTest);
router.route("/:id").delete(authProtect, protect, deleteTest);

module.exports = router;
