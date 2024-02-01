const express = require("express");
const {
  getAllResults,
  getResult,
  getResults,
  deleteTestResults,
} = require("../controllers/resultControllers");
const protect = require("../middlewares/protect");
const { authProtect } = require("../middlewares/authProtect");
const router = express.Router();

//GET all results for teacher
// router.get("/:id/getAllResults", authProtect, protect, getAllResults);

//DELETE student results with testId by teacher
router.delete("/:id", authProtect, protect, deleteTestResults);

//GET all his results for student & teacher
router.get("/", authProtect, getResults);

// GET a specific result by ID for student & teacher
router.get("/:id", authProtect, getResult);

module.exports = router;
