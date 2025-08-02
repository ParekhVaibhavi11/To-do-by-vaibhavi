// index.js

const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Middleware to parse form data and JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));
// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// In-memory array to act as a database
let todos = [];
let nextId = 1;

// GET Route to display the todo list
app.get('/', (req, res) => {
    res.render('index', { todos: todos, alert: null });
});

// POST Route to add a new todo
app.post('/todos', (req, res) => {
    const { title, priority } = req.body;
    // Server-side validation
    if (!title || title.trim() === '') {
        return res.render('index', { todos: todos, alert: { type: 'error', message: 'Task title cannot be empty!' } });
    }

    const newTodo = {
        id: nextId++,
        title: title.trim(),
        priority: priority || 'Low' // Default to 'Low' if not specified
    };

    todos.push(newTodo);
    res.redirect('/');
});

// POST Route to edit a todo
app.post('/todos/edit/:id', (req, res) => {
    const todoId = parseInt(req.params.id);
    const { title, priority } = req.body;

    // Find the todo to update
    const todoIndex = todos.findIndex(t => t.id === todoId);
    if (todoIndex !== -1) {
        // Server-side validation for edit
        if (!title || title.trim() === '') {
            const tempTodos = todos.map(t => t.id === todoId ? { ...t, isEditing: true } : t);
            return res.render('index', { todos: tempTodos, alert: { type: 'error', message: 'Task title cannot be empty!' } });
        }
        
        todos[todoIndex].title = title.trim();
        todos[todoIndex].priority = priority;
    }
    res.redirect('/');
});

// POST Route to delete a todo
app.post('/todos/delete/:id', (req, res) => {
    const todoId = parseInt(req.params.id);
    todos = todos.filter(t => t.id !== todoId);
    res.redirect('/');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});