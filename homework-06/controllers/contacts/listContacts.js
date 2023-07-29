const { Contact } = require('../../models/contact'); 

const listContacts = async (req, res) => {
  const { _id: owner } = req.user; 
  const { page = 1, limit = 10 } = req.query; // Отримуємо номер сторінки (page) та кількість контактів на сторінці (limit) з параметрів запиту
  const skip = (page - 1) * limit; // Обчислюємо кількість контактів, які необхідно пропустити перед отриманням даних з бази даних

  if (req.query.favorite) {
    const favorite = req.query.favorite === 'true'; // Конвертуємо параметр favorite в булеве значення
    const result = await Contact.find({ owner, favorite }, '', {
      // Знаходимо контакти в базі даних, де owner дорівнює id користувача і favorite дорівнює переданому значенню
      skip,
      limit,
    }).populate('owner', 'name email'); 
    return res.json(result);
  }

  const result = await Contact.find({ owner }, '', { skip, limit }).populate('owner', 'name email'); // Знаходимо всі контакти, де owner дорівнює id користувача, з врахуванням пагінації
  res.json(result); 
};

module.exports = listContacts; 
