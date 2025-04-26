import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const StudentList = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    axios.get('https://student-management-system-buv9.onrender.com/students')
      .then(res => setStudents(res.data))
      .catch(err => console.error(err));
  }, []);

  const deleteStudent = (id) => {
    axios.delete(`https://student-management-system-buv9.onrender.com/students/${id}`)
      .then(() => setStudents(students.filter(s => s._id !== id)))
      .catch(err => console.error(err));
  };

  return (
    <div className="container">
      <h2>Student List</h2>
      <Link to="/add">Add New Student</Link>
      <table>
        <thead>
          <tr>
            <th>Student ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Date of Birth</th>
            <th>Department</th>
            <th>Enrollment Year</th>
            <th>Active?</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s) => (
            <tr key={s._id}>
              <td>{s.studentId}</td>
              <td>{s.firstName}</td>
              <td>{s.lastName}</td>
              <td>{s.email}</td>
              <td>{new Date(s.dob).toLocaleDateString()}</td>
              <td>{s.department}</td>
              <td>{s.enrollmentYear}</td>
              <td>{s.isActive ? 'Yes' : 'No'}</td>
              <td>
  <div className="button-group">
    <Link to={`/edit/${s._id}`}>
      <button className="action-btn edit-btn">Edit</button>
    </Link>
    <button className="action-btn delete-btn" onClick={() => deleteStudent(s._id)}>Delete</button>
  </div>
</td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentList;
