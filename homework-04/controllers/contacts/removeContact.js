const { Contact } = require('../../models/contact'); 
const { HttpError } = require('../../helpers'); 
const removeContact = async (req, res) => {
  const { id } = req.params; // Отримання значення параметра id з запиту
  const result = await Contact.findByIdAndDelete(id); // Видалення контакту за допомогою методу findByIdAndDelete

  if (!result) {
    throw HttpError(404, 'Not found'); // Якщо результат видалення не знайдений, створюється об'єкт HttpError з кодом помилки 404 і повідомленням про помилку
  }

  res.json({
    message: 'contact deleted', // Відправка відповіді з повідомленням про видалення контакту
  });
};

module.exports = removeContact; 
