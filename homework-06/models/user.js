const { Schema, model } = require('mongoose');
const Joi = require('joi');
const { handleMongooseError } = require('../helpers');

const emailRegexp = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
const subscriptionList = ['starter', 'pro', 'business'];

// Створення схеми користувача з використанням mongoose
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      match: emailRegexp,
      required: [true, 'Email is required'], 
      unique: true, 
    },
    password: {
      type: String,
      minlength: 6, 
      required: [true, 'Set password for user'], 
    },
    subscription: {
      type: String,
      enum: subscriptionList, 
      default: 'starter', 
    },
    token: {
      type: String,
      default: '', // Значення за замовчуванням для токена
    },
    avatarURL: {
      type: String,
      required: true, // Обов'язкове поле для посилання на аватар
    },
    verify: {
      type: Boolean,
      default: false, // Значення за замовчуванням для підтвердження електронної пошти
    },
    verificationToken: {
      type: String,
      required: [true, 'Verify token is required'], 
    },
  },
  { versionKey: false }, // Вимкнення версій документів (поле "__v")
);

// Після збереження документа виникає помилка, обробка помилки зі спеціальною функцією
userSchema.post('save', handleMongooseError);

// Об'єкт Joi схем для валідації даних
const registerSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});

const emailSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().min(6).required(),
});

const changeSubscriptionSchema = Joi.object({
  subscription: Joi.string()
    .valid(...subscriptionList)
    .required(),
});

// Модель користувача зі схемою імені "user" та заданими схемами валідації
const User = model('user', userSchema);

const schemas = {
  registerSchema,
  loginSchema,
  changeSubscriptionSchema,
  emailSchema,
};

module.exports = {
  User,
  schemas,
};
