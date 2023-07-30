const mongoose = require('mongoose'); 

const app = require('./app'); 

const { DB_HOST } = process.env; // Отримання значення DB_HOST з змінної середовища

mongoose
  .connect(DB_HOST) // Виконує підключення до бази даних MongoDB за допомогою отриманого DB_HOST
  .then(() => {
    console.log('Database connection successful'); 
    app.listen(3000, () => {
      console.log('Server running. Use our API on port: 3000'); 
    });
  })
  .catch(error => {
    // Обробка помилки підключення до бази даних
    console.log(error.message); 
    process.exit(1); // Завершує процес з кодом помилки 1
  });
