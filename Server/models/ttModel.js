const mongoose =require('mongoose');
const Faculty = require('./facultyModel');

const timetableSchema = new mongoose.Schema({
  facultyId: {
    type: String,
    required: true
  },
  facultyName: { type: String, required: true },
  timetable: {
    // Example: { Monday: [{ period: 1, subject: 'Math', time: '9:00 - 9:50' }, ...] }
    Monday: [{ period: Number, subject: String, time: String, year: Number, branch: String }],
    Tuesday: [{ period: Number, subject: String, time: String, year: Number, branch: String }],
    Wednesday: [{ period: Number, subject: String, time: String, year: Number, branch: String  }],
    Thursday: [{ period: Number, subject: String, time: String, year: Number, branch: String  }],
    Friday: [{ period: Number, subject: String, time: String, year: Number, branch: String  }],
    Saturday: [{ period: Number, subject: String, time: String, year: Number, branch: String  }],
  },
}, { timestamps: true });

module.exports= mongoose.model('FacultyTimetable', timetableSchema);
