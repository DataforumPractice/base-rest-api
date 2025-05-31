const express = require('express');
const router = express.Router();

let users = ['Ирина', 'Ника'];

router.get('/users', (req, res) => {
  res.status(200).json({ users });
});

router.post('/users', (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'Поле name обязательно' });
  }

  if (typeof name !== 'string') {
    return res.status(400).json({ error: 'Поле name должно быть строкой' });
  }

  users.push(name);

  res.status(201).json({
    user: {
      name: name
    }
  });
});

module.exports = router;