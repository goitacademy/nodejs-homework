const { isValidObjectId } = require('mongoose');

const { HttpError } = require('../helpers'); 

const isValidId = (req, res, next) => {
  const { id } = req.params; 

  if (!isValidObjectId(id)) {
    // Перевірка, чи є id дійсним ObjectId
    next(HttpError(400, `${id} is not valid id`)); // Якщо id не є дійсним ObjectId, створюється об'єкт HttpError з кодом помилки 400 і повідомленням про помилку
  }

  next(); // Якщо id є дійсним ObjectId, переходимо до наступного middleware
};

module.exports = isValidId; 
