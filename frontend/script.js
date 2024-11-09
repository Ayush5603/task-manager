let tasks = [];
let completedTasks = [];

// Fetch all tasks
async function fetchTasks() {
    const response = await fetch('/api/tasks');
    tasks = await response.json();
    displayTasks();
}

// Fetch completed tasks
async function fetchCompletedTasks() {
    const response = await fetch('/api/completed-tasks');
    completedTasks = await response.json();
    displayCompletedTasks();
}

// Display tasks on the "Tasks" page
function displayTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';
    tasks.forEach(task => {
        const taskItem = document.createElement('li');
        taskItem.className = 'task-item';
        taskItem.innerHTML = `
            <span>${task.title}</span>
            <button onclick="markTaskCompleted(${task.id})">Task Completed</button>
            <button onclick="viewTaskDetails(${task.id})">View</button>
            <button onclick="deleteTask(${task.id})">Delete</button>
        `;
        taskList.appendChild(taskItem);
    });
}

// Display completed tasks on the "Completed Tasks" page
function displayCompletedTasks() {
    const completedTaskList = document.getElementById('completedTaskList');
    completedTaskList.innerHTML = '';
    completedTasks.forEach(task => {
        const taskItem = document.createElement('li');
        taskItem.className = 'task-item';
        taskItem.innerHTML = `
            <span>${task.title}</span>
            <button onclick="viewTaskDetails(${task.id})">View</button>
        `;
        completedTaskList.appendChild(taskItem);
    });
}

// Mark a task as completed
async function markTaskCompleted(id) {
    await fetch(`/api/tasks/${id}/complete`, { method: 'PUT' });
    fetchTasks();
    fetchCompletedTasks();
}

// View task details
function viewTaskDetails(id) {
    const task = tasks.find(t => t.id === id);
    document.getElementById('taskTitle').innerText = task.title;
    document.getElementById('taskDescription').innerText = task.description;
    document.getElementById('taskDate').innerText = `Created on: ${new Date(task.created_at).toDateString()}`;
}

// Delete task
async function deleteTask(id) {
    await fetch(`/api/tasks/${id}`, { method: 'DELETE' });
    fetchTasks();
}

// Initialize data
fetchTasks();
fetchCompletedTasks();
