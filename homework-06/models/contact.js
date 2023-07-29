const { Schema, model } = require('mongoose');
const Joi = require('joi');
const { handleMongooseError } = require('../helpers');

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
  { versionKey: false }, // Вимкнення версій документів (поле "__v")
);

// Після збереження документа виникає помилка, обробка помилки зі спеціальною функцією
contactSchema.post('save', handleMongooseError);

// Модель контакту зі схемою імені "contact"
const Contact = model('contact', contactSchema);

// Схема валідації даних для додавання контакту
const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

// Схема валідації даних для оновлення поля "favorite" контакту
const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

module.exports = { Contact, addSchema, updateFavoriteSchema };
