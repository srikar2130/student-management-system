import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditStudent = () => {
  const { id } = useParams();
  const navigate = useNavigate();

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

  useEffect(() => {
    axios.get(`https://student-management-system-buv9.onrender.com/students/${id}`)
      .then(res => {
        // Convert dob to yyyy-mm-dd format for date input
        const fetched = res.data;
        fetched.dob = new Date(fetched.dob).toISOString().split("T")[0];
        setStudent(fetched);
      })
      .catch(err => console.error(err));
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setStudent({
      ...student,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`https://student-management-system-buv9.onrender.com/students/${id}`, student)
      .then(() => navigate('/students'))
      .catch(err => console.error(err));
  };

  return (
    <div className="container">
  {<div style={{ padding: '20px' }}>
      <h2>Edit Student</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="studentId" placeholder="Student ID" value={student.studentId} onChange={handleChange} required /><br /><br />
        <input type="text" name="firstName" placeholder="First Name" value={student.firstName} onChange={handleChange} required /><br /><br />
        <input type="text" name="lastName" placeholder="Last Name" value={student.lastName} onChange={handleChange} required /><br /><br />
        <input type="email" name="email" placeholder="Email" value={student.email} onChange={handleChange} required /><br /><br />
        <input type="date" name="dob" value={student.dob} onChange={handleChange} required /><br /><br />
        <input type="text" name="department" placeholder="Department" value={student.department} onChange={handleChange} required /><br /><br />
        <input type="number" name="enrollmentYear" placeholder="Enrollment Year" value={student.enrollmentYear} onChange={handleChange} required /><br /><br />
        <label>
          Active:
          <input type="checkbox" name="isActive" checked={student.isActive} onChange={handleChange} />
        </label><br /><br />
        <button type="submit">Update Student</button>
      </form>
    </div>}
</div>

    
  );
};

export default EditStudent;
