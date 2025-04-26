import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="container">
  { <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1 >Welcome to the Student Management System</h1>
      <p>
        <Link to="/students">View Students</Link> | <Link to="/add">Add Student</Link>
      </p>
    </div>}
</div>

   
  );
};

export default Home;
