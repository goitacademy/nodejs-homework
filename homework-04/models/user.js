const { Schema, model } = require('mongoose'); 
const Joi = require('joi'); 
const { handleMongooseError } = require('../helpers'); // Імпорт допоміжної функції для обробки помилок Mongoose

const emailRegexp = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/; 
const subscriptionList = ['starter', 'pro', 'business']; // Список доступних підписок

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
      default: '',
    },
  },
  { versionKey: false },
);

userSchema.post('save', handleMongooseError); // Реєстрація обробника події 'save', який викликає функцію handleMongooseError для обробки помилок збереження моделі

const registerSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
}); // Схема Joi для валідації даних реєстрації користувача

const loginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().min(6).required(),
}); // Схема Joi для валідації даних входу користувача

const changeSubscriptionSchema = Joi.object({
  subscription: Joi.string()
    .valid(...subscriptionList)
    .required(),
}); // Схема Joi для валідації даних зміни підписки користувача

const User = model('user', userSchema); // Створення моделі User з використанням userSchema

const schemas = {
  registerSchema,
  loginSchema,
  changeSubscriptionSchema,
}; // Об'єднання схем в один об'єкт для експорту

module.exports = {
  User,
  schemas,
}; 
