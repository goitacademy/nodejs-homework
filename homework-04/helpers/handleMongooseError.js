const handleMongooseError = (error, data, next) => {
  const { name, code } = error; 

  // Визначення статусу на основі значень властивостей name та code
  const status = name === 'MongoServerError' && code === 11000 ? 409 : 400;

  error.status = status; // Встановлення властивості `status` об'єкта помилки з визначеним статусом

  next(); // Виклик наступної функції middleware
};

module.exports = handleMongooseError; 
