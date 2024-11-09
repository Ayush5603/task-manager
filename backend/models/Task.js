// backend/models/Task.js
const mysql = require('mysql2');

// Create a MySQL connection
const db = mysql.createConnection({
    host: 'localhost', // use your MySQL host if needed
    user: 'root', // replace with your MySQL username
    password: 'Ayush@563', // replace with your MySQL password
    database: 'task_manager'
});

// Connect to the database
db.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL');
});

// Functions for interacting with the database
const Task = {
    getAllTasks: (callback) => {
        db.query('SELECT * FROM tasks', callback);
    },
    createTask: (title, description, callback) => {
        db.query('INSERT INTO tasks (title, description) VALUES (?, ?)', [title, description], callback);
    },
    deleteTask: (id, callback) => {
        db.query('DELETE FROM tasks WHERE id = ?', [id], callback);
    },
    updateTask: (id, title, description, completed, callback) => {
        db.query('UPDATE tasks SET title = ?, description = ?, completed = ? WHERE id = ?', [title, description, completed, id], callback);
    }
};

module.exports = Task;
