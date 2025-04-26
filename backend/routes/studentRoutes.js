const express = require('express');
const router = express.Router();
const Student = require('../models/Student');

// Add student
router.post('/', async (req, res) => {
    console.log("Received POST /students:", req.body);  // 🧪 Log incoming data
  
    try {
      const student = new Student(req.body);
      const savedStudent = await student.save();
      res.json(savedStudent);
    } catch (err) {
      console.error("❌ Error while saving student:", err.message);  // 🧪 Log error
      res.status(500).json({ error: err.message });
    }
  });
  

// Get all students
router.get('/', async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get student by ID
router.get('/:id', async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    res.json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update student
router.put('/:id', async (req, res) => {
  try {
    const updatedStudent = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedStudent);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete student
router.delete('/:id', async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.json({ message: 'Student deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
