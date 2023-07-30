const jwt = require('jsonwebtoken'); 
const { User } = require('../models/user'); 

require('dotenv').config(); 
const { SECRET_KEY } = process.env; 

const { HttpError } = require('../helpers'); 

const authenticate = async (req, res, next) => {
  const { authorization = '' } = req.headers; // Отримання значення заголовка Authorization з запиту
  const [bearer, token] = authorization.split(' '); // Розбиття значення на частини, розділені пробілом: "Bearer" та сам токен

  if (bearer !== 'Bearer') {
    next(HttpError(401, 'Not authorized')); // Якщо перший елемент розділеного значення не дорівнює "Bearer", створюється об'єкт HttpError з кодом помилки 401 і повідомленням про помилку
  }

  try {
    const { id } = jwt.verify(token, SECRET_KEY); // Верифікація токена за допомогою секретного ключа, отримання ідентифікатора користувача
    const user = await User.findById(id); // Пошук користувача за ідентифікатором

    if (!user || !user.token || user.token !== token) {
      next(HttpError(401, 'Not authorized')); // Якщо користувача не знайдено, або відсутній токен або токен не співпадає, створюється об'єкт HttpError з кодом помилки 401 і повідомленням про помилку
    }

    req.user = user; 

    next(); // Продовження обробки запиту
  } catch {
    next(HttpError(401, 'Not authorized')); // Якщо сталася помилка під час верифікації токена, створюється об'єкт HttpError з кодом помилки 401 і повідомленням про помилку
  }
};

module.exports = authenticate; 
