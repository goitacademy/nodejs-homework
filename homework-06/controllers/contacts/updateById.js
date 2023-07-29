const { Contact, addSchema } = require('../../models/contact'); 
const { HttpError } = require('../../helpers');

const updateById = async (req, res) => {
  const { error } = addSchema.validate(req.body); // Перевіряємо, чи дані відповідають схемі addSchema

  if (error) {
    throw HttpError(400, 'missing fields'); 
  }

  const { id } = req.params; 
  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true }); // Знаходимо контакт за id та оновлюємо його дані на ті, що були передані у запиті

  if (!result) {
    throw HttpError(404, 'Not found'); 
  }

  res.json(result); 
};

module.exports = updateById;
