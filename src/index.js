const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3001;

// Правильный абсолютный путь
const uploadDir = path.join(__dirname, 'uploaded');

// Создаём папку, если её нет
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Конфигурация Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (ext === '.png' || ext === '.jpg') {
      cb(null, true);
    } else {
      cb(new Error('Недопустимый тип файла. Разрешены только PNG и JPG.'));
    }
  }
});

app.use(express.json());

// ========== POST загрузка файла ==========
app.post('/api/files', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'Файл не загружен или имеет неверный формат/размер' });
  }

  res.status(201).json({ file: req.file.filename });
});

// ========== GET скачивание файла ==========
app.get('/api/files/:file', (req, res) => {
  const fileName = req.params.file;
  const filePath = path.join(uploadDir, fileName);

  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    res.status(404).json({ error: 'Файл не найден' });
  }
});

// ========== Пример остальных маршрутов ==========
app.get('/hello', (req, res) => {
  res.status(200).send('Привет, незнакомец');
});

app.get('/hello/:name', (req, res) => {
  const name = req.params.name;
  res.status(200).send(`Привет, ${name}`);
});

let users = ['Ирина', 'Ника'];

app.get('/users', (req, res) => {
  res.status(200).json({ users });
});

app.post('/users', (req, res) => {
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


// Запуск сервера
app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});
