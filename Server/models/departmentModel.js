const mongoose = require("mongoose");

const departmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  head: { type: String, required: true },
  noOfFaculties: { type: Number, default: 0 },
}, { strict: "throw" });

const Department = mongoose.model("Department", departmentSchema);
module.exports = Department;
