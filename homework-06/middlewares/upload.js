const multer = require('multer'); // Підключаємо бібліотеку multer для обробки завантаження файлів
const path = require('path');

const tempDir = path.join(__dirname, '../', 'temp');

const multerConfig = multer.diskStorage({
  destination: tempDir, // Вказуємо директорію, куди будуть збережені тимчасові завантажені файли
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Генеруємо ім'я файлу на основі його оригінального імені
  },
});

const upload = multer({
  storage: multerConfig, // Передаємо конфігурацію multer для завантаження файлів
});

module.exports = upload;
