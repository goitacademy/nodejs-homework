const HttpErrors = require('./HttpErrors.js'); // Підключення модуля HttpErrors з файлу HttpErrors.js
const CtrlWrapper = require('./CtrlWrapper.js'); // Підключення модуля CtrlWrapper з файлу CtrlWrapper.js

module.exports = {
  HttpErrors, // Експорт модуля HttpErrors для використання в інших файлах
  CtrlWrapper, // Експорт модуля CtrlWrapper для використання в інших файлах
};
