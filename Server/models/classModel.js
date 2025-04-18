const mongoose = require("mongoose");

const classSchema = new mongoose.Schema(
  {
    name: { type: String, required: true }, // Class name
    department: { type: String, required: true }, // Department name
    faculty: { type: String, required: true }, // Faculty responsible for the class
    studentsCount: { type: Number, default: 0 }, // Number of students in the class
    schedule: { type: String, required: true }, // Schedule details
  },
  { strict: "throw" }
);

const Class = mongoose.model("Class", classSchema);
module.exports = Class;
