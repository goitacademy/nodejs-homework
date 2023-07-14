const { Contact } = require('../../models/contact'); 
const { HttpError } = require('../../helpers'); 

const getById = async (req, res) => {
  const { id } = req.params; 
  const result = await Contact.findById(id); // Пошук контакту за його ідентифікатором за допомогою методу findById

  if (!result) {
    throw HttpError(404, 'Not found'); // Якщо результат пошуку не знайдений, створюється об'єкт HttpError з відповідним кодом помилки та повідомленням про помилку
  }

  res.json(result); // Відправка відповіді зі знайденим контактом у форматі JSON
};

module.exports = getById; 
