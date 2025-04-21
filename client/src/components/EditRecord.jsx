import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditTimetable = () => {
  const [faculties, setFaculties] = useState([]);
  const [selectedFacultyId, setSelectedFacultyId] = useState('');
  const [timetable, setTimetable] = useState({});
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  // Fetch all faculties for dropdown
  useEffect(() => {
    const fetchFaculties = async () => {
      try {
        const response = await axios.get('http://localhost:3000/faculty-api/');
        setFaculties(response.data.payload || []);
      } catch (error) {
        console.error('Error loading faculties:', error);
        alert('Failed to load faculty list');
      }
    };
    fetchFaculties();
  }, []);

  // Load timetable when faculty is selected
  useEffect(() => {
    if (!selectedFacultyId) return;

    const loadTimetable = async () => {
      setLoading(true);
      console.log('selected id is ', selectedFacultyId)

      try {
        const response = await axios.get(`http://localhost:3000/tt-api/timetable/${selectedFacultyId}`);
        const timetableData = response.data.payload?.timetable || {};
        setTimetable(timetableData);
        
      } catch (error) {
        console.error('Error loading timetable:', error);
        alert('Failed to load timetable');
        setTimetable({});
      } finally {
        setLoading(false);
      }
    };
    loadTimetable();
  }, [selectedFacultyId]);

  const handleFieldChange = (day, index, field, value) => {
    const updatedDay = [...timetable[day]];
    updatedDay[index][field] = value;
    setTimetable(prev => ({
      ...prev,
      [day]: updatedDay,
    }));
  };

  const addNewSlot = (day) => {
    const newSlot = { period: '', subject: '', time: '', year: '', branch: '' };
    setTimetable(prev => ({
      ...prev,
      [day]: [...prev[day], newSlot],
    }));
  };

  const deleteSlot = (day, index) => {
    const updatedDay = timetable[day].filter((_, i) => i !== index);
    setTimetable(prev => ({
      ...prev,
      [day]: updatedDay,
    }));
  };

  const saveTimetable = async () => {
    if (!selectedFacultyId) return;

    setSaving(true);
    try {
      await axios.put(`http://localhost:3000/tt-api/update/${selectedFacultyId}`, { timetable });
      alert('Timetable updated successfully!');
      console.log(timetable)
    } catch (error) {
      console.error('Error saving timetable:', error);
      alert('Failed to save timetable');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center">Edit Faculty Timetable</h2>

      <div className="mb-3">
        <label className="form-label">Select Faculty:</label>
        <select
          className="form-select"
          value={selectedFacultyId}
          onChange={(e) => setSelectedFacultyId(e.target.value)}
          disabled={loading || saving}
        >
          <option value="">-- Select Faculty --</option>
          {faculties.map(faculty => (
            <option key={faculty._id} value={faculty.facultyId}>
              {faculty.name} ({faculty.facultyId})
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className="text-center my-4">Loading timetable...</div>
      ) : (
        selectedFacultyId && (
          <>
            {Object.keys(timetable).map(day => (
              <div key={day} className="mb-5">
                <h3 className="mb-3">{day} Timetable</h3>
                {timetable[day].map((slot, index) => (
                  <div key={index} className="mb-3 p-3 border rounded">
                    <div className="mb-2">
                      <label className="form-label">Period:</label>
                      <input
                        type="number"
                        className="form-control"
                        value={slot.period || ''}
                        placeholder="Period"
                        onChange={(e) => handleFieldChange(day, index, 'period', e.target.value)}
                      />
                    </div>
                    <div className="mb-2">
                      <label className="form-label">Subject:</label>
                      <input
                        type="text"
                        className="form-control"
                        value={slot.subject || ''}
                        placeholder="Subject"
                        onChange={(e) => handleFieldChange(day, index, 'subject', e.target.value)}
                      />
                    </div>
                    <div className="mb-2">
                      <label className="form-label">Time:</label>
                      <input
                        type="text"
                        className="form-control"
                        value={slot.time || ''}
                        placeholder="Time"
                        onChange={(e) => handleFieldChange(day, index, 'time', e.target.value)}
                      />
                    </div>
                    <div className="mb-2">
                      <label className="form-label">Year:</label>
                      <input
                        type="number"
                        className="form-control"
                        value={slot.year || ''}
                        placeholder="Year"
                        onChange={(e) => handleFieldChange(day, index, 'year', e.target.value)}
                      />
                    </div>
                    <div className="mb-2">
                      <label className="form-label">Branch:</label>
                      <input
                        type="text"
                        className="form-control"
                        value={slot.branch || ''}
                        placeholder="Branch"
                        onChange={(e) => handleFieldChange(day, index, 'branch', e.target.value)}
                      />
                    </div>
                    <button
                      className="btn btn-danger btn-sm mt-2"
                      onClick={() => deleteSlot(day, index)}
                    >
                      Delete Slot
                    </button>
                  </div>
                ))}
                <button
                  className="btn btn-primary btn-sm mt-2"
                  onClick={() => addNewSlot(day)}
                >
                  + Add Slot
                </button>
              </div>
            ))}

            <button
              className="btn btn-success mt-3"
              disabled={saving || Object.keys(timetable).length === 0}
              onClick={saveTimetable}
            >
              {saving ? 'Saving...' : 'Save Timetable'}
            </button>
          </>
        )
      )}
    </div>
  );
};

export default EditTimetable;
