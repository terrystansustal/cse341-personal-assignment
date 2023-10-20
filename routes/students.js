const express = require("express");
const router = express.Router();

const studentsController = require("../controllers/students");
const validation = require('../middleware/validate');

// This route will get all the students

router.get("/", studentsController.getAll);

// This route will get a specific student

router.get("/:id", studentsController.getSingle);

// This route will create a new student

router.post("/", validation.saveContact, studentsController.createStudent);

// This route will update the data

router.put("/:id", validation.saveContact, studentsController.updateStudent);

// This route will delete the data

router.delete("/:id", studentsController.deleteStudent);

module.exports = router;
