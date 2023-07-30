const { Schema, model } = require('mongoose'); 
const Joi = require('joi'); 
const { handleMongooseError } = require('../helpers'); // Імпорт допоміжної функції для обробки помилок Mongoose

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for contact'],
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
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
  },

  { versionKey: false },
);

contactSchema.post('save', handleMongooseError); // Реєстрація обробника події 'save', який викликає функцію handleMongooseError для обробки помилок збереження моделі

const Contact = model('contact', contactSchema); 

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
}); // Схема Joi для валідації даних додавання контакту

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
}); // Схема Joi для валідації даних оновлення поля "favorite" контакту

module.exports = { Contact, addSchema, updateFavoriteSchema }; // Експорт моделі Contact та схем для валідації даних додавання та оновлення контакту
