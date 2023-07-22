const HttpError = (status, message) => {
  const error = new Error(message);
  error.status = status; // Додавання властивості "status" з переданим статусом до об'єкту помилки
  return error;
};

module.exports = HttpError; // Експорт функції HttpError для використання її в інших модулях проекту
