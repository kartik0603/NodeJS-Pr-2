const express = require('express');
const app = express();


app.use(express.json());

let initialTodo = [
    { title: 'HTML', isCompleted: true, id: 1 },
    { title: 'JavaScript', isCompleted: true, id: 2 },
    { title: 'React', isCompleted: false, id: 3 }
];

// Welcome route
app.get('/', (req, res) => {
    res.send('Welcome to the todo API');
});

// Get all todos
app.get('/todos', (req, res) => {
    res.json(initialTodo);
});

// Add a new todo
app.post('/addtodo', (req, res) => {
    const { title, isCompleted } = req.body;
    const newTodo = {
        title,
        isCompleted,
        id: initialTodo.length ? initialTodo[initialTodo.length - 1].id + 1 : 1
    };
    initialTodo.push(newTodo);
    res.json(newTodo);
});

// Update a todo
app.patch('/update/:id', (req, res) => {
    const { id } = req.params;
    const { title, isCompleted } = req.body;
    const todo = initialTodo.find(todo => todo.id == id);
    if (todo) {
        if (title !== undefined) todo.title = title;
        if (isCompleted !== undefined) todo.isCompleted = isCompleted;
        res.json(todo);
    } else {
        res.status(404).send('Todo not found');
    }
});

// Delete a todo
app.delete('/delete/:id', (req, res) => {
    const { id } = req.params;
    const index = initialTodo.findIndex(todo => todo.id == id);
    if (index !== -1) {
        let deletedTodo = initialTodo.splice(index, 1)[0];
        res.json({ deletedTodo, todos: initialTodo });
    } else {
        res.status(404).send('Todo not found');
    }
});

// Get a single todo by id
app.get('/todo/:id', (req, res) => {
    const { id } = req.params;
    const todo = initialTodo.find(todo => todo.id == id);
    if (todo) {
        res.json(todo);
    } else {
        res.status(404).send('Todo not found');
    }
});

// Filter todos by status
app.get('/findbystatus', (req, res) => {
    const { isCompleted } = req.query;
    const filteredTodos = initialTodo.filter(todo => todo.isCompleted.toString() === isCompleted);
    res.json(filteredTodos);
});

app.listen(8090, () => {
    console.log("Server is running on port 8090" );
});
