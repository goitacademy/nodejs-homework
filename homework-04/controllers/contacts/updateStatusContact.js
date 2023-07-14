const { Contact, updateFavoriteSchema } = require('../../models/contact'); 
const { HttpError } = require('../../helpers'); 

const updateStatusContact = async (req, res) => {
  const { error } = updateFavoriteSchema.validate(req.body); // Валідація запиту за допомогою схеми updateFavoriteSchema

  if (error) {
    throw HttpError(400, 'missing field favorite'); // Якщо виникає помилка валідації, створюється об'єкт HttpError з кодом помилки 400 і повідомленням про помилку
  }

  const { id } = req.params; // Отримання значення параметра id з запиту
  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true }); // Оновлення контакту за допомогою методу findByIdAndUpdate

  if (!result) {
    throw HttpError(404, 'Not found'); // Якщо результат оновлення не знайдений, створюється об'єкт HttpError з кодом помилки 404 і повідомленням про помилку
  }

  res.json(result); 
};

module.exports = updateStatusContact; 
