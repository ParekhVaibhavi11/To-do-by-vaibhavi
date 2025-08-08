// index.js

const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


let todos = [];
let nextId = 1;


app.get('/', (req, res) => {
    res.render('index', { todos: todos, alert: null });
});


app.post('/todos', (req, res) => {
    const { title, priority } = req.body;
    // Server-side validation
    if (!title || title.trim() === '') {
        return res.render('index', { todos: todos, alert: { type: 'error', message: 'Task title cannot be empty!' } });
    }

    const newTodo = {
        id: nextId++,
        title: title.trim(),
        priority: priority || 'Low' 
    };

    todos.push(newTodo);
    res.redirect('/');
});


app.post('/todos/edit/:id', (req, res) => {
    const todoId = parseInt(req.params.id);
    const { title, priority } = req.body;

   
    const todoIndex = todos.findIndex(t => t.id === todoId);
    if (todoIndex !== -1) {
        
        if (!title || title.trim() === '') {
            const tempTodos = todos.map(t => t.id === todoId ? { ...t, isEditing: true } : t);
            return res.render('index', { todos: tempTodos, alert: { type: 'error', message: 'Task title cannot be empty!' } });
        }
        
        todos[todoIndex].title = title.trim();
        todos[todoIndex].priority = priority;
    }
    res.redirect('/');
});


app.post('/todos/delete/:id', (req, res) => {
    const todoId = parseInt(req.params.id);
    todos = todos.filter(t => t.id !== todoId);
    res.redirect('/');
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});