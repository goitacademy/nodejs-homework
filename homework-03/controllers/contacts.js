const { Contact, addSchema, updateFavoriteSchema } = require('../models/contact'); // Підключення моделі Contact та схем addSchema, updateFavoriteSchema з файлу '../models/contact'

const { HttpError } = require('../helpers'); // Підключення об'єкта HttpError з файлу '../helpers'
const ctrlWrapper = require('../helpers/ctrlWrapper'); // Підключення модуля ctrlWrapper з файлу '../helpers/ctrlWrapper'

const listContacts = async (req, res, next) => {
  const result = await Contact.find(); // Отримання всіх контактів з використанням методу find моделі Contact
  res.json(result); // Відправлення результату у вигляді JSON-відповіді
  console.log(result); // Виведення результату у консоль
};

const getById = async (req, res, next) => {
  const { id } = req.params; // Отримання значення параметра id з запиту
  const result = await Contact.findById(id); // Отримання контакту за заданим id з використанням методу findById моделі Contact

  if (!result) {
    throw HttpError(404, 'Not found'); // Генерація об'єкта помилки HttpError зі статусом 404 та повідомленням 'Not found', якщо контакт не знайдений
  }

  res.json(result); // Відправлення результату у вигляді JSON-відповіді
};

const addContact = async (req, res, next) => {
  const { error } = addSchema.validate(req.body); // Перевірка валідності даних запиту за схемою addSchema

  if (error) {
    throw HttpError(400, 'missing required name field'); // Генерація об'єкта помилки HttpError зі статусом 400 та повідомленням 'missing required name field', якщо дані невалідні
  }

  const result = await Contact.create(req.body); // Створення нового контакту з переданими даними

  res.status(201).json(result); // Відправлення результату у вигляді JSON-відповіді зі статусом 201 (Створено)
};

const updateById = async (req, res, next) => {
  const { error } = addSchema.validate(req.body); // Перевірка валідності даних запиту за схемою addSchema

  if (error) {
    throw HttpError(400, 'missing fields'); // Генерація об'єкта помилки HttpError зі статусом 400 та повідомленням 'missing fields', якщо дані невалідні
  }

  const { id } = req.params; // Отримання значення параметра id з запиту
  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true }); // Оновлення контакту за заданим id з використанням методу findByIdAndUpdate моделі Contact

  if (!result) {
    throw HttpError(404, 'Not found'); // Генерація об'єкта помилки HttpError зі статусом 404 та повідомленням 'Not found', якщо контакт не знайдений
  }

  res.json(result); // Відправлення результату у вигляді JSON-відповіді
};

const updateStatusContact = async (req, res) => {
  const { error } = updateFavoriteSchema.validate(req.body); // Перевірка валідності даних запиту за схемою updateFavoriteSchema

  if (error) {
    throw HttpError(400, 'missing field favorite'); // Генерація об'єкта помилки HttpError зі статусом 400 та повідомленням 'missing field favorite', якщо дані невалідні
  }

  const { id } = req.params; // Отримання значення параметра id з запиту
  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true }); // Оновлення контакту за заданим id з використанням методу findByIdAndUpdate моделі Contact

  if (!result) {
    throw HttpError(404, 'Not found'); // Генерація об'єкта помилки HttpError зі статусом 404 та повідомленням 'Not found', якщо контакт не знайдений
  }

  res.json(result); // Відправлення результату у вигляді JSON-відповіді
};

const removeContact = async (req, res, next) => {
  console.log(req.params); // Виведення значення параметрів запиту у консоль
  const { id } = req.params; // Отримання значення параметра id з запиту
  const result = await Contact.findByIdAndDelete(id); // Видалення контакту за заданим id з використанням методу findByIdAndDelete моделі Contact

  if (!result) {
    throw HttpError(404, 'Not found'); // Генерація об'єкта помилки HttpError зі статусом 404 та повідомленням 'Not found', якщо контакт не знайдений
  }

  res.json({
    message: 'contact deleted', // Відправлення відповіді з повідомленням про успішне видалення контакту
  });
};

module.exports = {
  listContacts: ctrlWrapper(listContacts), // Експорт функції listContacts, обгорнутої в ctrlWrapper
  getById: ctrlWrapper(getById), // Експорт функції getById, обгорнутої в ctrlWrapper
  addContact: ctrlWrapper(addContact), // Експорт функції addContact, обгорнутої в ctrlWrapper
  updateById: ctrlWrapper(updateById), // Експорт функції updateById, обгорнутої в ctrlWrapper
  updateStatusContact: ctrlWrapper(updateStatusContact), // Експорт функції updateStatusContact, обгорнутої в ctrlWrapper
  removeContact: ctrlWrapper(removeContact), // Експорт функції removeContact, обгорнутої в ctrlWrapper
};
