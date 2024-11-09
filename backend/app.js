const express = require('express');
const mysql = require('mysql2');
const path = require('path');

const app = express();
const port = 3000;

// Middleware for parsing JSON and URL encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MySQL database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Ayush@563',  // Use your MySQL password
    database: 'task_manager'
});

// Connect to the database
db.connect((err) => {
    if (err) {
        console.error('Database connection failed: ', err);
        return;
    }
    console.log('Connected to the MySQL database');
});

// Serve static files (for frontend)
app.use(express.static(path.join(__dirname, 'public')));

// API to fetch all tasks (including completed ones)
app.get('/api/tasks', (req, res) => {
    db.query('SELECT * FROM tasks ORDER BY created_at DESC', (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(results);
    });
});

// API to fetch completed tasks
app.get('/api/completed-tasks', (req, res) => {
    db.query('SELECT * FROM tasks WHERE completed = true ORDER BY created_at DESC', (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(results);
    });
});

// API to add a new task
app.post('/api/tasks', (req, res) => {
    const { title, description } = req.body;
    db.query(
        'INSERT INTO tasks (title, description) VALUES (?, ?)',
        [title, description],
        (err, results) => {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            res.status(201).json({ message: 'Task created successfully' });
        }
    );
});

// API to mark a task as completed
app.put('/api/tasks/:id/complete', (req, res) => {
    const taskId = req.params.id;
    db.query(
        'UPDATE tasks SET completed = true WHERE id = ?',
        [taskId],
        (err, results) => {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            res.status(200).json({ message: 'Task marked as completed' });
        }
    );
});

// API to delete a task
app.delete('/api/tasks/:id', (req, res) => {
    const taskId = req.params.id;
    db.query(
        'DELETE FROM tasks WHERE id = ?',
        [taskId],
        (err, results) => {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            res.status(200).json({ message: 'Task deleted successfully' });
        }
    );
});

// API to fetch a single task by ID
app.get('/api/tasks/:id', (req, res) => {
    const taskId = req.params.id;
    db.query(
        'SELECT * FROM tasks WHERE id = ?',
        [taskId],
        (err, results) => {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            if (results.length === 0) {
                res.status(404).json({ error: 'Task not found' });
                return;
            }
            res.json(results[0]);
        }
    );
});

// Serve the HTML files for frontend
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/tasks', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'tasks.html'));
});

app.get('/completed', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'completed.html'));
});

app.get('/view_task', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'view_task.html'));
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
