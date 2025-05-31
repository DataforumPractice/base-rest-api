const express = require('express');
const router = express.Router();

router.get('/hello', (req, res) => {
  res.status(200).send('Привет, незнакомец');
});

router.get('/hello/:name', (req, res) => {
  const name = req.params.name;
  res.status(200).send(`Привет, ${name}`);
});

module.exports = router;