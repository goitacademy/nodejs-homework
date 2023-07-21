const jwt = require('jsonwebtoken');
const { User } = require('../models/user');

require('dotenv').config();
const { SECRET_KEY } = process.env;

const { HttpError } = require('../helpers');

const authenticate = async (req, res, next) => {
  const { authorization = '' } = req.headers; // Отримання заголовку Authorization з запиту, якщо такий існує
  const [bearer, token] = authorization.split(' '); // Розділення токена на частини по пробілу

  if (bearer !== 'Bearer') {
    // Перевірка на наявність токена та перевірка його типу
    next(HttpError(401, 'Not authorized')); // Якщо токен не валідний, викликаємо функцію HttpError зі статусом 401 та повідомленням про помилку
  }

  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);
    if (!user || !user.token || user.token !== token) {
      // Перевірка чи користувач з таким id існує та чи токен співпадає з токеном з бази даних
      next(HttpError(401, 'Not authorized'));
    }

    req.user = user;

    next(); // Переходимо до наступного middleware
  } catch {
    next(HttpError(401, 'Not authorized'));
  }
};

module.exports = authenticate;
