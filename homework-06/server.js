const mongoose = require('mongoose'); 
const app = require('./app'); // Підключення Express-додатку з файлу `app.js`
const { DB_HOST } = process.env; 

// Встановлення з'єднання з базою даних MongoDB
mongoose
  .connect(DB_HOST) 
  .then(() => {
    console.log('Database connection successful');
    app.listen(3000, () => {
      console.log('Server running. Use our API on port: 3000'); 
    });
  })
  .catch(error => {
    console.log(error.message); 
    process.exit(1); // Вихід з процесу з кодом помилки 1, щоб позначити, що виникла помилка при підключенні
  });
