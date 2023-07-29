const bcryptjs = require('bcryptjs'); // Підключення бібліотеки для хешування паролів
const jwt = require('jsonwebtoken'); 
const { User } = require('../../models/user'); 
const { HttpError } = require('../../helpers'); 
const { SECRET_KEY } = process.env; 

const login = async (req, res) => {
  const { email, password } = req.body; 
  const user = await User.findOne({ email }); 

  if (!user) {
    throw HttpError(401, 'Email or password is wrong');
  }

  if (!user.verify) {
    throw HttpError(401, 'Email not verified');
  }

  const passwordCompare = await bcryptjs.compare(password, user.password); // Перевірка, чи введений пароль збігається з хешованим паролем користувача
  if (!passwordCompare) {
    throw HttpError(401, 'Email or password is wrong');
  }

  const payload = {
    id: user._id,
  }; // Створення об'єкту payload для підпису в JWT токені

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '7d' }); // Створення JWT токена з підписом на основі payload та секретного ключа
  await User.findByIdAndUpdate(user._id, { token }); // Збереження JWT токена в базі даних

  res.json({
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  }); // Відправлення відповіді з JWT токеном та даними користувача (email та підписка)
};

module.exports = login; 
