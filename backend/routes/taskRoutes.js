// backend/routes/taskRoutes.js
const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// Get all tasks
router.get('/tasks', (req, res) => {
    Task.getAllTasks((err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Create a new task
router.post('/tasks', (req, res) => {
    const { title, description } = req.body;
    Task.createTask(title, description, (err, result) => {
        if (err) throw err;
        res.json({ message: 'Task created', id: result.insertId });
    });
});

// Delete a task
router.delete('/tasks/:id', (req, res) => {
    const id = req.params.id;
    Task.deleteTask(id, (err) => {
        if (err) throw err;
        res.json({ message: 'Task deleted' });
    });
});

// Update a task
router.put('/tasks/:id', (req, res) => {
    const id = req.params.id;
    const { title, description, completed } = req.body;
    Task.updateTask(id, title, description, completed, (err) => {
        if (err) throw err;
        res.json({ message: 'Task updated' });
    });
});

module.exports = router;
