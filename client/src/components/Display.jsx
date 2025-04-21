import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Form, Table, Container, Row, Col, Spinner, Alert } from 'react-bootstrap';

function Display() {
  const [facultyList, setFacultyList] = useState([]);
  const [selectedFaculty, setSelectedFaculty] = useState('');
  const [timetable, setTimetable] = useState(null); // Changed to null initially
  const [loading, setLoading] = useState({
    faculty: false,
    timetable: false
  });
  const [error, setError] = useState({
    faculty: null,
    timetable: null
  });

  const handleFacultyChange = (e) => {
    setSelectedFaculty(e.target.value);
    setError(prev => ({...prev, timetable: null}));
  };

  // Function to get faculty name by ID
  const getFacultyNameById = (facultyId) => {
    if (!facultyId) return '';
    const faculty = facultyList.find(f => f._id === facultyId);
    return faculty ? faculty.name : '';
  };

  // Fetch all faculty names on mount
  useEffect(() => {
    setLoading(prev => ({...prev, faculty: true}));
    setError(prev => ({...prev, faculty: null}));
    
    axios.get('http://localhost:3000/faculty-api/')
      .then(res => {
        const data = res.data.payload || res.data;
        if (data && Array.isArray(data)) {
          setFacultyList(data);
        } else {
          setError(prev => ({...prev, faculty: 'Invalid faculty data format'}))
        }
      })
      .catch(err => {
        console.error('Error fetching faculty:', err);
        setError(prev => ({...prev, faculty: 'Failed to load faculty list'}))
      })
      .finally(() => setLoading(prev => ({...prev, faculty: false})));
  }, []);

  // Fetch timetable for selected faculty
  useEffect(() => {
    if (selectedFaculty) {
      setLoading(prev => ({...prev, timetable: true}));
      setError(prev => ({...prev, timetable: null}));
      
      axios.get(`http://localhost:3000/tt-api/timetable/${selectedFaculty}`)
        .then(res => {
          if (res.data && res.data.payload && res.data.payload.timetable) {
            setTimetable(res.data.payload.timetable);
          } else {
            setError(prev => ({...prev, timetable: 'No timetable data found'}));
          }
        })
        .catch(err => {
          console.error('Error fetching timetable:', err);
          setError(prev => ({...prev, timetable: 'Failed to load timetable'}));
        })
        .finally(() => setLoading(prev => ({...prev, timetable: false})));
    } else {
      setTimetable(null);
    }
  }, [selectedFaculty]);

  // Function to transform timetable data for display
  const transformTimetableData = (timetableObj) => {
    if (!timetableObj) return [];
    
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days.map(day => {
      const periods = timetableObj[day] || [];
      const periodData = {};
      
      // Initialize all periods as empty
      for (let i = 1; i <= 5; i++) {
        periodData[`p${i}`] = '-';
      }
      
      // Fill in the actual period data
      periods.forEach(period => {
        if (period.period >= 1 && period.period <= 5) {
          periodData[`p${period.period}`] = period.subject;
        }
      });
      
      return {
        day,
        ...periodData
      };
    });
  };

  const displayTimetable = transformTimetableData(timetable);

  return (
    <Container className="mt-4">
      <Row className="mb-3">
        <Col md={6}>
          <Form.Group>
            <Form.Label>Select Faculty</Form.Label>
            {loading.faculty ? (
              <Spinner size="sm" animation="border" />
            ) : (
              <>
                <Form.Control
                  as="select"
                  value={selectedFaculty}
                  onChange={handleFacultyChange}
                  disabled={!!error.faculty}
                >
                  <option value="">Select Faculty</option>
                  {facultyList.map(fac => (
                    <option key={fac._id} value={fac._id}>
                      {fac.name} (ID: {fac.facultyId})
                    </option>
                  ))}
                </Form.Control>
                {facultyList.length === 0 && !error.faculty && (
                  <Alert variant="warning" className="mt-2">
                    No faculty members found
                  </Alert>
                )}
              </>
            )}
            {error.faculty && <Alert variant="danger" className="mt-2">{error.faculty}</Alert>}
          </Form.Group>
        </Col>
      </Row>

      {selectedFaculty && (
        <Row className="mb-3">
          <Col>
            <h4>Timetable for: {getFacultyNameById(selectedFaculty)}</h4>
          </Col>
        </Row>
      )}

      {loading.timetable ? (
        <div className="text-center my-4">
          <Spinner animation="border" />
          <p>Loading timetable...</p>
        </div>
      ) : error.timetable ? (
        <Alert variant="danger">{error.timetable}</Alert>
      ) : timetable ? (
        <Table striped bordered hover responsive>
          <thead className="table-primary">
            <tr>
              <th>Day</th>
              <th>Class 1</th>
              <th>Class 2</th>
              <th>Class 3</th>
              <th>Class 4</th>
              <th>Class 5</th>
            </tr>
          </thead>
          <tbody>
            {displayTimetable.map((entry, index) => (
              <tr key={index}>
                <td>{entry.day}</td>
                <td>{entry.p1}</td>
                <td>{entry.p2}</td>
                <td>{entry.p3}</td>
                <td>{entry.p4}</td>
                <td>{entry.p5}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : selectedFaculty ? (
        <Alert variant="info">No timetable data available for this faculty</Alert>
      ) : (
        <Alert variant="secondary">Please select a faculty to view timetable</Alert>
      )}
    </Container>
  );
}

export default Display;