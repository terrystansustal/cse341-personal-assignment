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
  const userId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDb()
    .db("students")
    .collection("students")
    .find({ _id: userId });
  result.toArray().then((lists) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(lists[0]);
  });
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

module.exports = { getAll, getSingle, createStudent };
