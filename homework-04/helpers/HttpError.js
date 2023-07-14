const HttpError = (status, message) => {
  const error = new Error(message); // Створення нового об'єкта помилки з переданим повідомленням
  error.status = status; // Додавання властивості `status` до об'єкта помилки з переданим статусом
  return error; // Повернення об'єкта помилки
};

module.exports = HttpError; 
