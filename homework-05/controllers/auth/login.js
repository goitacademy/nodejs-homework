const bcryptjs = require('bcryptjs'); // Підключення бібліотеки для шифрування паролей
const jwt = require('jsonwebtoken');
const { User } = require('../../models/user');
const { HttpError } = require('../../helpers');
const { SECRET_KEY } = process.env;

const login = async (req, res) => {
  const { email, password } = req.body;

  // Пошук користувача в базі даних за його електронною поштою
  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(401, 'Email or password is wrong');
  }

  // Порівняння введеного користувачем пароля з захешованим паролем з бази даних
  const passwordCompare = await bcryptjs.compare(password, user.password);

  if (!passwordCompare) {
    throw HttpError(401, 'Email or password is wrong');
  }

  // Створення пейлоада для JWT-токена, який містить ID користувача
  const payload = {
    id: user._id,
  };

  // Генерація JWT-токена з використанням пейлоада, секретного ключа та терміну дії токена
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '7d' });

  // Оновлення користувача в базі даних, зберігаючи згенерований токен
  await User.findByIdAndUpdate(user._id, { token });

  res.json({
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

module.exports = login;
