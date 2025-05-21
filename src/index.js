const express = require('express');
const app = express();
const port = 3001;

app.use(express.json());

let users = ['Ирина', 'Ника'];

app.get('/hello', (req, res) => {
  res.status(200).send('Привет, незнакомец');
});

app.get('/hello/:name', (req, res) => {
  const name = req.params.name;
  res.status(200).send(`Привет, ${name}`);
});

app.get('/users', (req, res) => {
  res.status(200).json({ users });
});

app.post('/users', (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'Поле name обязательно' });
  }

  users.push(name);

  res.status(201).json({
    user: {
      name: name
    }
  });
});

app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});
