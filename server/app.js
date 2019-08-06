const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// Настройка парсера
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Set headers for CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8082');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Передача параметров запуска сервера для предварительного подключения к БД
require('./db/db')(startServer);

// Передача приложения для обработки маршрутов
app.get('/', (req, res) => {
  res.send('GET-запрос на сервер');
});

require('./routers/operationsRoutes')(app);
// Функция для запуска сервера
function startServer () {
  app.listen(3000);
  console.log('Сервер запущен на порту 3000');
}
