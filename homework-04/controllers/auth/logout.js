const { User } = require('../../models/user'); 

const logout = async (req, res) => {
  const { _id } = req.user; 
  await User.findByIdAndUpdate(_id, { token: '' }); // Оновлення користувача за його _id, з встановленням значення token як пустий рядок

  res.status(204).json(); // Відправка відповіді зі статусом 204 (Немає вмісту)
};

module.exports = logout; 
