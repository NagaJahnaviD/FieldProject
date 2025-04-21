const exp=require('express')
const FacultyTimetable =  require('../models/ttModel.js');
const Faculty = require('../models/facultyModel.js');

const ttApp = exp.Router();

ttApp.post('/add', async (req, res) => {
  const { facultyId, facultyName, timetable } = req.body;

  if (!facultyId || !facultyName || !timetable) {
    return res.status(400).json({ error: 'Missing facultyId, facultyName, or timetable' });
  }

  try {
    const existingFaculty = await FacultyTimetable.findOne({ facultyId });

    if (existingFaculty) {
      // Ensure timetable is an array before pushing
      if (typeof timetable !== 'object' || Array.isArray(timetable)) {
        return res.status(400).json({ error: 'Timetable must be an object with days as keys' });
      }
      
      // Optional: Validate day names
      const validDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const invalidDays = Object.keys(timetable).filter(day => !validDays.includes(day));
      if (invalidDays.length > 0) {
        return res.status(400).json({ error: `Invalid day(s): ${invalidDays.join(', ')}` });
      }
      
      // Merge each day's array into existing timetable
      for (const day in timetable) {
        if (Array.isArray(timetable[day])) {
          if (!Array.isArray(existingFaculty.timetable[day])) {
            existingFaculty.timetable[day] = [];
          }
          existingFaculty.timetable[day].push(...timetable[day]);
        }
      }
      
      await existingFaculty.save();
      return res.status(200).json({
        message: 'Timetable updated successfully',
        updatedCount: Object.values(timetable).reduce((acc, arr) => acc + arr.length, 0),
      });
      
      
      return res.status(200).json({
        message: 'Timetable updated successfully',
        updatedCount: timetable.length, // Number of new classes added
      });
    } else {
      // Create new entry
      const newEntry = new FacultyTimetable({ facultyId, facultyName, timetable });
      await newEntry.save();
      return res.status(201).json({ 
        message: 'New timetable created successfully',
        data: newEntry,
      });
    }
  } catch (err) {
    console.error("Error in /add:", err); // Log full error for debugging

    // Specific error cases
    if (err.name === 'ValidationError') {
      return res.status(400).json({ error: `Validation failed: ${err.message}` });
    }
    if (err.code === 11000) { // MongoDB duplicate key (if facultyId is unique)
      return res.status(409).json({ error: 'Faculty ID already exists' });
    }

    // Generic server error (avoid exposing internal details in production)
    res.status(500).json({ 
      error: 'Failed to update timetable',
      details: process.env.NODE_ENV === 'development' ? err.message : undefined,
    });
  }
});

// get tt of specific faculty
ttApp.get('/timetable/:id', async (req,res)=>{
  // let fId = await Faculty.findById(req.params.id)
  // if (!fId) {
  //   return res.status(404).json({ message: 'Faculty not found' });
  // }

  const tt = await FacultyTimetable.findOne({ facultyId: req.params.id });
  if (!tt) {
    return res.status(404).json({ message: 'Timetable not found' });
  }
  console.log(tt)
  res.status(200).json({ message: 'fetched', payload: { timetable: tt.timetable } });
})

// Update timetable
ttApp.put('/update/:id', async (req, res) => {
  try {
    const exists = await FacultyTimetable.findOne({ facultyId: req.params.id });
console.log('Matched document:', exists);

    const updated = await FacultyTimetable.findOneAndUpdate(
      {facultyId:req.params.id},
      { $set: { timetable: req.body.timetable } },
      { new: true }
    );
    console.log('Updated id is ', req.params.id)
    console.log('received data', req.body)
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Delete timetable of a faculty  (hard delete)
ttApp.delete('/delete/:id', async (req, res) => {
  try {
    const deleted = await FacultyTimetable.findByIdAndDelete(req.params.id);
    res.status(200).json({message:'Timetable deleted'})
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Fetch all timetables
ttApp.get('/timetables', async (req, res) => {
  const all = await FacultyTimetable.find();
  res.json(all);
});

module.exports=ttApp;