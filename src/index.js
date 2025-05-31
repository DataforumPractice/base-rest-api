const express = require('express');
const app = require('express')();
const port = 3001;

const filesRouter = require('./routes/files');
const helloRouter = require('./routes/hello');
const usersRouter = require('./routes/users');

app.use(express.json());

app.use('/', filesRouter); 
app.use('/', helloRouter); 
app.use('/', usersRouter); 

app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});