const express = require("express");
const router = express.Router();

const studentsController = require("../controllers/students");

// This route will get all the students

router.get("/", studentsController.getAll);

// This route will get a specific student

router.get("/:id", studentsController.getSingle);

// This route will create a new student

router.post("/", studentsController.createStudent);

module.exports = router;
