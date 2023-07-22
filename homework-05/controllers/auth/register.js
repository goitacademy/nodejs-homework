const bcryptjs = require('bcryptjs'); // Підключення бібліотеки для хешування паролів
const { User } = require('../../models/user');
const { HttpError } = require('../../helpers');

const register = async (req, res) => {
  const { email, password } = req.body;

  // Перевірка, чи в базі даних вже існує користувач з таким email
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, 'Email in use');
  }

  const hashPassword = await bcryptjs.hash(password, 10);

  const newUser = await User.create({ ...req.body, password: hashPassword });

  res.status(201).json({
    name: newUser.name,
    email: newUser.email,
  });
};

module.exports = register;
