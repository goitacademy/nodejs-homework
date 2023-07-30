const { HttpError } = require('../helpers'); 

const validateBody = schema => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body); // Валідація тіла запиту з використанням заданої схеми

    if (error) {
      next(HttpError(400, error.message)); // Якщо виникає помилка валідації, створюється об'єкт HttpError з кодом помилки 400 і повідомленням про помилку
    }

    next(); // Якщо валідація успішна, переходимо до наступного middleware
  };

  return func; 
};

module.exports = validateBody; 
