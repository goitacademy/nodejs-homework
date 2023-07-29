const jwt = require('jsonwebtoken');
const { User } = require('../models/user');

require('dotenv').config(); // Підключаємо .env для отримання SECRET_KEY
const { SECRET_KEY } = process.env;

const { HttpError } = require('../helpers');

const authenticate = async (req, res, next) => {
  const { authorization = '' } = req.headers; // Отримуємо заголовок Authorization з запиту, який містить токен доступу
  const [bearer, token] = authorization.split(' '); // Розбиваємо заголовок Authorization на дві частини: тип токена та сам токен

  if (bearer !== 'Bearer') {
    next(HttpError(401, 'Not authorized'));
  }

  try {
    const { id } = jwt.verify(token, SECRET_KEY); 
    const user = await User.findById(id); 

    if (!user || !user.token || user.token !== token) {
      next(HttpError(401, 'Not authorized')); 
    }

    req.user = user; 

    next(); // Переходимо до наступної мідлвари або обробника запиту
  } catch {
    next(HttpError(401, 'Not authorized')); 
  }
};

module.exports = authenticate; 
