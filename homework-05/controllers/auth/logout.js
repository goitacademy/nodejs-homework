const { User } = require('../../models/user');

const logout = async (req, res) => {
  const { _id } = req.user;
  // Оновлення користувача в базі даних, встановивши поле `token` пустим рядком, що призведе до деактивації токена
  await User.findByIdAndUpdate(_id, { token: '' });

  res.status(204).json();
};

module.exports = logout;
