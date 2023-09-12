const mongoose = require('mongoose'); // Підключення модуля mongoose для роботи з MongoDB
const app = require('./app'); // Підключення модуля app з файлу app.js
const { DB_HOST, PORT = 3000 } = process.env; // Деструктуризація властивостей об'єкту process.env: DB_HOST - хост бази даних, PORT - порт для сервера (за замовчуванням 3000)

mongoose
  .connect(DB_HOST) // Встановлення з'єднання з базою даних MongoDB за допомогою mongoose та передача хосту бази даних
  .then(() => {
    app.listen(PORT); // Запуск сервера на вказаному порті
  })
  .catch(error => {
    console.log(error.message); // Виведення повідомлення про помилку підключення до бази даних
    process.exit(1); // Вихід з процесу зі статусом 1 (помилка)
  });
