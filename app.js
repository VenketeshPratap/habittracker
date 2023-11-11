const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 8000;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Dummy data for habits
let habits = [
  { id: 1, name: 'Read a book', status: 'None' },
  { id: 2, name: 'Go to the gym', status: 'None' },
];

// Routes
app.get('/', (req, res) => {
  res.render('index', { habits });
});

app.get('/habits', (req, res) => {
  res.render('habits', { habits });
});

app.post('/add-habit', (req, res) => {
  const newHabit = {
    id: habits.length + 1,
    name: req.body.habitName,
    status: 'None',
  };
  habits.push(newHabit);
  res.redirect('/habits');
});

app.post('/update-status/:id', (req, res) => {
  const habitId = parseInt(req.params.id);
  const newStatus = req.body.status;

  habits = habits.map((habit) => {
    if (habit.id === habitId) {
      return { ...habit, status: newStatus };
    }
    return habit;
  });

  res.redirect('/habits');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
