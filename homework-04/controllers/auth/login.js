const bcryptjs = require('bcryptjs'); 
const jwt = require('jsonwebtoken'); 
const { User } = require('../../models/user'); 
const { HttpError } = require('../../helpers'); 
const { SECRET_KEY } = process.env; 

const login = async (req, res) => {
  const { email, password } = req.body; 
  const user = await User.findOne({ email }); // Пошук користувача за email за допомогою методу findOne моделі User

  if (!user) {
    throw HttpError(401, 'Email or password is wrong'); // Якщо користувач не знайдений, створюється об'єкт HttpError з кодом помилки 401 і повідомленням про помилку
  }

  const passwordCompare = await bcryptjs.compare(password, user.password); // Порівняння пароля з хешованим паролем користувача за допомогою bcryptjs

  if (!passwordCompare) {
    throw HttpError(401, 'Email or password is wrong'); // Якщо порівняння пароля не пройшло успішно, створюється об'єкт HttpError з кодом помилки 401 і повідомленням про помилку
  }

  const payload = {
    id: user._id, // Створення об'єкта payload з ідентифікатором користувача
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '7d' }); // Створення токена на основі payload, SECRET_KEY та встановленням терміну дії токена
  await User.findByIdAndUpdate(user._id, { token }); // Оновлення користувача за його _id, з встановленням значення токена

  res.json({
    token, // Відправка токена у відповіді
    user: {
      email: user.email, // Відправка електронної адреси користувача у відповіді
      subscription: user.subscription, // Відправка підписки користувача у відповіді
    },
  }); // Відправка відповіді з токеном та даними користувача у форматі JSON
};

module.exports = login; 
