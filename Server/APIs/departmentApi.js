const express = require("express");
const departmentApp = express.Router();
const Department = require("../models/departmentModel");
const expressAsyncHandler = require("express-async-handler");

// Create a new department
departmentApp.post(
  "/",
  expressAsyncHandler(async (req, res) => {
    const newDepartment = new Department(req.body);
    const savedDepartment = await newDepartment.save();
    res.status(201).send({ message: "Department created", payload: savedDepartment });
  })
);

// Get all departments
departmentApp.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const departments = await Department.find();
    res.status(200).send({ message: "Departments retrieved", payload: departments });
  })
);

// Update department by ID
departmentApp.put(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const updatedDepartment = await Department.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).send({ message: "Department updated", payload: updatedDepartment });
  })
);

module.exports = departmentApp;
