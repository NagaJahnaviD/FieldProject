import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

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
    axios.get('http://localhost:3000/faculty-api')
      .then(res => setFacultyList(res.data.payload))
      .catch(err => console.error('Error fetching faculty list:', err));
  }, []);

  const handleInputChange = (day, index, field, value) => {
    const updatedDay = [...timetable[day]];
    updatedDay[index][field] = value;
    setTimetable(prev => ({
      ...prev,
      [day]: updatedDay,
    }));
  };

  const addPeriod = (day) => {
    const newPeriod = { period: '', subject: '', time: '', year: '', branch: '' };
    setTimetable(prev => ({
      ...prev,
      [day]: [...prev[day], newPeriod],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let faculty = facultyList.find(fac => fac.facultyId === facultyId);
    let facultyName = faculty ? faculty.name : null;

    if (!facultyName) {
      alert('Faculty not found. Please select a valid faculty.');
      return;
    }

    try {
      const res = await axios.post('http://localhost:3000/tt-api/add', {
        facultyId,
        facultyName,
        timetable,
      });

      alert('Timetable added successfully!');
      console.log(res.data);
    } catch (err) {
      console.error('Error adding timetable:', err);
      alert('Failed to add timetable');
    }
  };

  return (
    <div className="container my-5 p-4 border rounded shadow" style={{ backgroundColor: '#ffffff' }}>
  <h2 className="text-center mb-4" style={{ color: '#920f0f' }}>Add Faculty Timetable</h2>

  <form onSubmit={handleSubmit}>
    <div className="mb-3">
      <label className="form-label fw-bold" style={{ color: '#000000' }}>Select Faculty:</label>
      <select
        className="form-select"
        value={facultyId}
        onChange={(e) => setFacultyId(e.target.value)}
        required
      >
        <option value="">-- Choose Faculty --</option>
        {facultyList.map(fac => (
          <option key={fac._id} value={fac.facultyId}>
            {fac.facultyId} - {fac.name}
          </option>
        ))}
      </select>
    </div>

    {Object.keys(timetable).map(day => (
      <div key={day} className="mb-4 border-bottom pb-3">
        <h4 className="mb-3" style={{ color: '#920f0f' }}>{day}</h4>

        {timetable[day].map((entry, index) => (
          <div key={index} className="row g-3 mb-2">
            <div className="col">
              <input
                type="number"
                className="form-control text-black"
                placeholder="Period"
                value={entry.period}
                onChange={(e) => handleInputChange(day, index, 'period', e.target.value)}
                required
              />
            </div>
            <div className="col">
              <input
                type="text"
                className="form-control text-black"
                placeholder="Subject"
                value={entry.subject}
                onChange={(e) => handleInputChange(day, index, 'subject', e.target.value)}
                required
              />
            </div>
            <div className="col">
              <input
                type="text"
                className="form-control text-black"
                placeholder="Time"
                value={entry.time}
                onChange={(e) => handleInputChange(day, index, 'time', e.target.value)}
                required
              />
            </div>
            <div className="col">
              <input
                type="number"
                className="form-control text-black"
                placeholder="Year"
                value={entry.year}
                onChange={(e) => handleInputChange(day, index, 'year', e.target.value)}
                required
              />
            </div>
            <div className="col">
              <input
                type="text"
                className="form-control text-black"
                placeholder="Branch"
                value={entry.branch}
                onChange={(e) => handleInputChange(day, index, 'branch', e.target.value)}
                required
              />
            </div>
          </div>
        ))}

        <button
          type="button"
          className="btn btn-sm mt-2"
          style={{ backgroundColor: '#920f0f', color: '#fff' }}
          onClick={() => addPeriod(day)}
        >
          + Add Period
        </button>
      </div>
    ))}

    <div className="text-center mt-4">
      <button
        type="submit"
        className="btn px-4 py-2"
        style={{ backgroundColor: '#920f0f', color: '#fff' }}
      >
        Submit Timetable
      </button>
    </div>
  </form>
</div>


  );
};

export default AddTimetable;