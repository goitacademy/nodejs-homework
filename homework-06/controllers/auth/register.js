const bcryptjs = require('bcryptjs'); // Підключення бібліотеки для хешування паролів
const gravatar = require('gravatar'); // Підключення бібліотеки для отримання аватарки з сервісу Gravatar
const { User } = require('../../models/user'); 
const { HttpError, sendEmail } = require('../../helpers'); 
const { nanoid } = require('nanoid'); 
require('dotenv').config(); 

const { BASE_URL } = process.env;

const register = async (req, res) => {
  const { email, password } = req.body; 
  const user = await User.findOne({ email }); // Знаходження користувача за email в базі даних (звернення до бази даних потребує await, щоб дочекатись результату пошуку)

  if (user) {
    throw HttpError(409, 'Email in use');
  }

  const hashPassword = await bcryptjs.hash(password, 10); // Хешування пароля з використанням bcryptjs
  const avatarUrl = gravatar.url(email); // Отримання посилання на аватарку з сервісу Gravatar
  const verificationToken = nanoid(); 

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarUrl,
    verificationToken,
  }); 

  const verifyEmail = {
    to: email,
    subject: 'Verify email',
    html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${verificationToken}">Click to verify email</a>`,
  }; // Створення об'єкту email для відправки листа з посиланням для верифікації email

  await sendEmail(verifyEmail); // Відправлення листа з посиланням на верифікацію email

  res.status(201).json({
    name: newUser.name,
    email: newUser.email,
    avatar: newUser.avatarUrl,
  }); // Відправлення відповіді з даними про створеного користувача
};

module.exports = register; 
