const { HttpError } = require('../helpers');

// Мідлвар для перевірки валідності даних в запиті на відповідну схему "schema"
const validateBody = schema => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body); 
    if (error) {
      next(HttpError(400, error.message)); 
    }
    next(); // Якщо дані валідні, передаємо управління наступному мідлвару або обробнику запиту
  };
  return func; 
};

module.exports = validateBody; 
