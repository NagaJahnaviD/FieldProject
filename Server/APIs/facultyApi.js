const express = require("express");
const facultyApp = express.Router();
const Faculty = require("../models/facultyModel");
const expressAsyncHandler = require("express-async-handler");

// Create a new faculty
facultyApp.post(
  "/",
  expressAsyncHandler(async (req, res) => {
    const newFaculty = new Faculty(req.body);
    const savedFaculty = await newFaculty.save();
    res.status(201).send({ message: "Faculty created", payload: savedFaculty });
  })
);

// Get all faculties
facultyApp.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const faculties = await Faculty.find({ isActive: true });
    res.status(200).send({ message: "Faculties retrieved", payload: faculties });
  })
);

// Get all faculty by id
facultyApp.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const faculty = await Faculty.findById( req.params.id );
    res.status(200).send({ message: "Faculties retrieved", payload: faculty });
    console.log("Requested ID:", req.params.id);
console.log("Faculty found:", faculty);

  })
);

// Update faculty by ID
facultyApp.put(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const updatedFaculty = await Faculty.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).send({ message: "Faculty updated", payload: updatedFaculty });
  })
);

// Delete (soft delete) a faculty by ID
facultyApp.put(
  "/delete/:id",
  expressAsyncHandler(async (req, res) => {
    const deactivatedFaculty = await Faculty.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );
    res.status(200).send({ message: "Faculty deactivated", payload: deactivatedFaculty });
  })
);

module.exports = facultyApp;
