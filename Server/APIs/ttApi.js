const exp=require('express')
const FacultyTimetable =  require('../models/ttModel.js');
const Faculty = require('../models/facultyModel.js');

const ttApp = exp.Router();

// Add new timetable
ttApp.post('/add', async (req, res) => {
  const {facultyId, facultyName, timetable } = req.body;
  try {
    const newEntry = new FacultyTimetable({facultyId,  facultyName, timetable });
    await newEntry.save();
    res.status(201).json({ message: 'Timetable added successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// get tt of specific faculty
ttApp.get('/timetable/:id', async (req,res)=>{
  let fId = await Faculty.findById(req.params.id)
  const tt= await FacultyTimetable.findOne({facultyId:fId.facultyId})
  console.log(tt)
  res.status(200).json({message:'fetched', payload:tt})
})

// Update timetable
ttApp.put('/update/:id', async (req, res) => {
  try {
    const updated = await FacultyTimetable.findByIdAndUpdate(req.params.id, req.body, { new: true });
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