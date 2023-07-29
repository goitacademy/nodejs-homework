const { Contact, updateFavoriteSchema } = require('../../models/contact'); 
const { HttpError } = require('../../helpers');

const updateStatusContact = async (req, res) => {
  const { error } = updateFavoriteSchema.validate(req.body); // Перевіряємо, чи дані з введеним полем favorite відповідають схемі updateFavoriteSchema

  if (error) {
    throw HttpError(400, 'missing field favorite'); 
  }

  const { id } = req.params; 
  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true }); // Знаходимо контакт за id та оновлюємо його дані на ті, що були передані у запиті

  if (!result) {
    throw HttpError(404, 'Not found'); 
  }

  res.json(result); 
};

module.exports = updateStatusContact;
