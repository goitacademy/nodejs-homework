const { isValidObjectId } = require('mongoose'); 
const { HttpError } = require('../helpers');

const isValidId = (req, res, next) => {
  const { id } = req.params; 
  if (!isValidObjectId(id)) {
    // Перевіряємо чи переданий ідентифікатор є дійсним ObjectId
    next(HttpError(400, `${id} is not valid id`));
  }

  next(); // Якщо ідентифікатор є дійсним ObjectId, переходимо до наступної мідлвари або обробника запиту
};

module.exports = isValidId; 
