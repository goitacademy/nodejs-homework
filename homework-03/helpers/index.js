const HttpError = require('./HttpError'); // Підключення модуля HttpError з файлу './HttpError'
const ctrl = require('./ctrlWrapper'); // Підключення модуля ctrl з файлу './ctrlWrapper'
const handleMongooseError = require('./handleMongooseError'); // Підключення модуля handleMongooseError з файлу './handleMongooseError'

module.exports = {
  HttpError, // Експорт модуля HttpError для використання в інших файлів
  ctrl, // Експорт модуля ctrl для використання в інших файлів
  handleMongooseError, // Експорт модуля handleMongooseError для використання в інших файлів
};
