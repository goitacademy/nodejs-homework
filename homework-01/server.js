const app = require('./app'); // Підключення модуля `app`

app.listen(3000, () => {
  // Запуск сервера на порті 3000
  console.log('Server running. Use our API on port: 3000'); // Вивід повідомлення у консолі
});
