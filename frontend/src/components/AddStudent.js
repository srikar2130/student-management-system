import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddStudent = () => {
  const [student, setStudent] = useState({
    studentId: '',
    firstName: '',
    lastName: '',
    email: '',
    dob: '',
    department: '',
    enrollmentYear: '',
    isActive: true
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setStudent({
      ...student,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('https://student-management-system-buv9.onrender.com/students', student)
      .then(() => navigate('/students'))
      .catch(err => console.error(err));
  };

  return (
    <div className="container">
  { <div style={{ padding: '20px' }}>
      <h2>Add Student</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="studentId" placeholder="Student ID" onChange={handleChange} required /><br /><br />
        <input type="text" name="firstName" placeholder="First Name" onChange={handleChange} required /><br /><br />
        <input type="text" name="lastName" placeholder="Last Name" onChange={handleChange} required /><br /><br />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required /><br /><br />
        <input type="date" name="dob" onChange={handleChange} required /><br /><br />
        <input type="text" name="department" placeholder="Department" onChange={handleChange} required /><br /><br />
        <input type="number" name="enrollmentYear" placeholder="Enrollment Year" onChange={handleChange} required /><br /><br />
        <label>
          Active:
          <input type="checkbox" name="isActive" checked={student.isActive} onChange={handleChange} />
        </label><br /><br />
        <button type="submit">Add Student</button>
      </form>
    </div>}
     </div>

   
  );
};

export default AddStudent;
