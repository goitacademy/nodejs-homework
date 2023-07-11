const { isValidObjectId } = require('mongoose'); // Підключення функції isValidObjectId з модуля mongoose
const { HttpError } = require('../helpers'); // Підключення об'єкта HttpError з папки '../helpers'

const isValidId = (req, res, next) => {
  const { id } = req.params; // Отримання значення параметра id з запиту
  if (!isValidObjectId(id)) {
    // Перевірка, чи є значення id валідним ObjectId
    next(HttpError(400, `${id} is not valid id`)); // Генерація об'єкта помилки HttpError зі статусом 400 та повідомленням `${id} is not valid id` і передача його на обробку наступному middleware або обробнику помилок
  }

  next(); // Перехід до наступної middleware або обробника
};

module.exports = isValidId; // Експорт функції isValidId для використання в інших файлів
