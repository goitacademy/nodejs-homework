const multer = require('multer'); // Імпорт бібліотеки multer для обробки завантаження файлів
const path = require('path');

const tempDir = path.join(__dirname, '../', 'temp'); // Шлях до тимчасової директорії для збереження завантажених файлів

const multerConfig = multer.diskStorage({
  destination: tempDir, // Встановлення шляху до директорії, де будуть зберігатись тимчасово завантажені файли
  filename: (req, file, cb) => {
    // Функція для визначення імені завантаженого файлу
    cb(null, file.originalname); // Встановлення оригінального імені файлу для збереження
  },
});

const upload = multer({
  // Створення middleware для завантаження файлів з використанням налаштувань multerConfig
  storage: multerConfig,
});

module.exports = upload;
