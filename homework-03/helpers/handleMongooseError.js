const handleMongooseError = (error, data, next) => {
  error.status = 400; // Встановлення статусу помилки на 400
  next(); // Виклик наступної middleware або обробника
};

module.exports = handleMongooseError; // Експорт функції handleMongooseError для використання в інших файлах
