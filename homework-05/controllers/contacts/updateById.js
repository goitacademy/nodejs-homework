const updateById = async (req, res) => {
  // Перевірка валідності даних контакту з тілом запиту згідно схеми addSchema
  const { error } = addSchema.validate(req.body);
  if (error) {
    throw HttpError(400, 'missing fields');
  }

  const { id } = req.params;

  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });

  // Перевірка, чи було успішне оновлення контакту
  if (!result) {
    throw HttpError(404, 'Not found');
  }

  res.json(result);
};

module.exports = updateById;
