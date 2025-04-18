const express = require("express");
const classApp = express.Router();
const Class = require("../models/classModel");
const expressAsyncHandler = require("express-async-handler");

// Create a new class
classApp.post(
  "/",
  expressAsyncHandler(async (req, res) => {
    const newClass = new Class(req.body);
    const savedClass = await newClass.save();
    res.status(201).send({ message: "Class created", payload: savedClass });
  })
);

// Get all classes
classApp.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const classes = await Class.find();
    res.status(200).send({ message: "Classes retrieved", payload: classes });
  })
);

// Update class by ID
classApp.put(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const updatedClass = await Class.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).send({ message: "Class updated", payload: updatedClass });
  })
);

// Delete a class by ID
classApp.delete(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    await Class.findByIdAndDelete(req.params.id);
    res.status(200).send({ message: "Class deleted" });
  })
);

module.exports = classApp;
