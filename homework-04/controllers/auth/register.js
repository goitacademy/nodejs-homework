const bcryptjs = require('bcryptjs'); 
const { User } = require('../../models/user'); 
const { HttpError } = require('../../helpers'); 

const register = async (req, res) => {
  const { email, password } = req.body; 
  const user = await User.findOne({ email }); 

  if (user) {
    throw HttpError(409, 'Email in use'); // Якщо користувач знайдений, створюється об'єкт HttpError з кодом помилки 409 і повідомленням про помилку
  }

  const hashPassword = await bcryptjs.hash(password, 10); // Хешування пароля за допомогою bcryptjs
  const newUser = await User.create({ ...req.body, password: hashPassword }); // Створення нового користувача з використанням даних з запиту та хешованого пароля

  res.status(201).json({
    name: newUser.name,
    email: newUser.email,
  }); // Відправка відповіді зі статусом 201 (Створено) та даними нового користувача у форматі JSON
};

module.exports = register;
