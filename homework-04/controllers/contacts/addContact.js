const { Contact, addSchema } = require('../../models/contact'); 
const { HttpError } = require('../../helpers'); 

const addContact = async (req, res) => {
  const { error } = addSchema.validate(req.body); // Валідація запиту за допомогою схеми addSchema

  if (error) {
    throw HttpError(400, 'missing required name field'); // Якщо виникає помилка валідації, створюється об'єкт HttpError з кодом помилки 400 і повідомленням про помилку
  }

  const { _id: owner } = req.user; 
  const result = await Contact.create({ ...req.body, owner }); // Створення нового контакту з використанням даних з запиту та значення owner

  res.status(201).json(result); // Відправка відповіді зі статусом 201 (Створено) та створеним контактом у форматі JSON
};

module.exports = addContact;
