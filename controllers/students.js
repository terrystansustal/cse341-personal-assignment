const { response } = require("express");
const mongodb = require("../db/connection");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res, next) => {
  const result = await mongodb
    .getDb()
    .db("students")
    .collection("students")
    .find();
  result.toArray().then((lists) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(lists);
  });
};

const getSingle = async (req, res, next) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json("Must use a valid student id to find a student.");
    return; // Exit early if the ID is not valid.
  }

  const userId = new ObjectId(req.params.id);
  const collection = mongodb.getDb().db("students").collection("students");
  
  const result = await collection.findOne({ _id: userId });

  if (result) {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(result);
  } else {
    res.status(404).json("Student not found");
  }
};

const createStudent = async (req, res, next) => {
  const student = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    birthDate: req.body.birthDate,
    homeAddress: req.body.homeAddress,
    contactInformation: req.body.contactInformation,
    email: req.body.email,
    studentID: req.body.studentID,
    enrollmentStatus: req.body.enrollmentStatus,
    academicProgram: req.body.academicProgram,
  };
  const response = await mongodb
    .getDb()
    .db("students")
    .collection("students")
    .insertOne(student);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res
      .status(500)
      .json(response.error || "Some error occurred while creating the contact");
  }
};

const updateStudent = async (req, res, next) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid student id to update a student')
  }
  const userId = new ObjectId(req.params.id);
  const student = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    birthDate: req.body.birthDate,
    homeAddress: req.body.homeAddress,
    contactInformation: req.body.contactInformation,
    email: req.body.email,
    studentID: req.body.studentID,
    enrollmentStatus: req.body.enrollmentStatus,
    academicProgram: req.body.academicProgram,
  };
  const response = await mongodb.getDb().db('students').collection('students').replaceOne({ _id: userId }, student);
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while updating the contact');
  };
};

const deleteStudent = async (req, res, next) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must be a valid student id to delete a contact');
  }
  const userId = new ObjectId(req.params.id);
  const response = await mongodb.getDb().db('students').collection('students').deleteOne({ _id: userId }, true);
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(200).send();
  } else {
    res.status(500).json(response.error || 'Some errors occurred while deleting the student');
  };
};

module.exports = { getAll, getSingle, createStudent, updateStudent, deleteStudent };
