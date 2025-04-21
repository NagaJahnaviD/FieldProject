import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddTimetable = () => {
  const [facultyList, setFacultyList] = useState([]);
  const [facultyId, setFacultyId] = useState('');
  const [timetable, setTimetable] = useState({
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
  });

  useEffect(() => {
    // Fetch all faculty records from backend
    axios.get('http://localhost:3000/faculty-api')
      .then(res => setFacultyList(res.data.payload))
      .catch(err => console.error('Error fetching faculty list:', err));
  }, []);

  const handleInputChange = (day, index, field, value) => {
    const updatedDay = [...timetable[day]];
    updatedDay[index][field] = value;
    setTimetable(prev => ({
      ...prev,
      [day]: updatedDay
    }));
  };

  const addPeriod = (day) => {
    const newPeriod = { period: '', subject: '', time: '', year: '', branch: '' };
    setTimetable(prev => ({
      ...prev,
      [day]: [...prev[day], newPeriod]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Selected facultyId:", facultyId);
  console.log("Faculty list:", facultyList);
    let faculty = facultyList.find(fac => fac.facultyId === facultyId);
    console.log("found faculty", faculty)
    let facultyName = faculty ? faculty.name : null;
  
    if (!facultyName) {
      alert('Faculty not found. Please select a valid faculty.');
      return; // Stop submission if no faculty is found
    }
  
    console.log("Submitting:", {
      facultyId,
      facultyName,
      timetable
    });
  
    try {
      const res = await axios.post('http://localhost:3000/tt-api/add', {
        facultyId,
        facultyName,
        timetable
      });
  
      alert('Timetable added successfully!');
      console.log(res.data);
    } catch (err) {
      console.error('Error adding timetable:', err);
      alert('Failed to add timetable');
    }
  };
  

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Add Faculty Timetable</h2>

      <form onSubmit={handleSubmit}>
        {/* Faculty Dropdown */}
        <label className="block mb-2 font-semibold">Select Faculty:</label>
        <select
          className="border p-2 w-full mb-4"
          value={facultyId}
          onChange={(e) => setFacultyId(e.target.value)}
          required
        >
          <option value="">-- Choose Faculty --</option>
          { facultyList.map(fac => (
            <option key={fac._id} value={fac.facultyId}>
              {fac.facultyId} - {fac.name}
            </option>
          ))}
        </select>

        {/* Timetable Inputs */}
        {Object.keys(timetable).map(day => (
          <div key={day} className="mb-4">
            <h3 className="font-semibold mb-2">{day}</h3>
            {timetable[day].map((entry, index) => (
              <div key={index} className="grid grid-cols-5 gap-2 mb-2">
                <input
                  type="number"
                  className="border p-2"
                  placeholder="Period"
                  value={entry.period}
                  onChange={(e) => handleInputChange(day, index, 'period', e.target.value)}
                  required
                />
                <input
                  type="text"
                  className="border p-2"
                  placeholder="Subject"
                  value={entry.subject}
                  onChange={(e) => handleInputChange(day, index, 'subject', e.target.value)}
                  required
                />
                <input
                  type="text"
                  className="border p-2"
                  placeholder="Time"
                  value={entry.time}
                  onChange={(e) => handleInputChange(day, index, 'time', e.target.value)}
                  required
                />
                <input
                  type="number"
                  className="border p-2"
                  placeholder="Year"
                  value={entry.year}
                  onChange={(e) => handleInputChange(day, index, 'year', e.target.value)}
                  required
                />
                <input
                  type="text"
                  className="border p-2"
                  placeholder="Branch"
                  value={entry.branch}
                  onChange={(e) => handleInputChange(day, index, 'branch', e.target.value)}
                  required
                />
              </div>
            ))}
            <button
              type="button"
              className="bg-blue-500 text-white px-3 py-1 rounded"
              onClick={() => addPeriod(day)}
            >
              + Add Period
            </button>
          </div>
        ))}

        <button type="submit" className="mt-4 bg-green-600 text-white px-4 py-2 rounded">
          Submit Timetable
        </button>
      </form>
    </div>
  );
};

export default AddTimetable;
