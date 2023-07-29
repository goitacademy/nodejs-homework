const updateStatusContact = async (req, res) => {
  // Перевірка валідності поля favorite у тілі запиту згідно схеми updateFavoriteSchema
  const { error } = updateFavoriteSchema.validate(req.body);
  if (error) {
    throw HttpError(400, 'missing field favorite');
  }

  const { id } = req.params;

  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });

  // Перевірка, чи було успішне оновлення контакту
  if (!result) {
    throw HttpError(404, 'Not found');
  }

  res.json(result);
};

module.exports = updateStatusContact;
