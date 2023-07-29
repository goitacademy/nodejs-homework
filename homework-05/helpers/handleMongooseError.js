const handleMongooseError = (error, data, next) => {
  const { name, code } = error;
  // Якщо помилка є MongoDB Duplicate Key Error (код 11000), статус 409 - Conflict
  // В інших випадках, статус 400 - Bad Request
  const status = name === 'MongoServerError' && code === 11000 ? 409 : 400;
  // Додавання статусу до об'єкту помилки
  error.status = status;
  next();
};

module.exports = handleMongooseError;
