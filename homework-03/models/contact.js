const { Schema, model } = require('mongoose'); // Підключення модулів Schema та model з mongoose
const Joi = require('joi'); // Підключення модуля Joi для валідації даних
const { handleMongooseError } = require('../helpers'); // Підключення функції handleMongooseError з папки '../helpers'

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for contact'], // Властивість name має тип String та обов'язкова для заповнення. Якщо значення не вказане, генерується помилка з повідомленням "Set name for contact"
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false }, // Вимкнення створення властивості "__v" з версією документа
);

contactSchema.post('save', handleMongooseError); // Додавання обробника події 'save' до схеми контакту, який викликає функцію handleMongooseError при збереженні контакту

const Contact = model('contact', contactSchema); // Створення моделі Contact з назвою 'contact' і схемою contactSchema

const addSchema = Joi.object({
  name: Joi.string().required(), // Валідація поля name як обов'язкового рядка
  email: Joi.string().required(), // Валідація поля email як обов'язкового рядка
  phone: Joi.string().required(), // Валідація поля phone як обов'язкового рядка
});

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(), // Валідація поля favorite як обов'язкового булевого значення
});

module.exports = { Contact, addSchema, updateFavoriteSchema }; // Експорт моделі Contact, схеми addSchema та updateFavoriteSchema для використання в інших файлів
