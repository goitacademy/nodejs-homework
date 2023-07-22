const addContact = async (req, res) => {
  // Валідація даних контакту згідно схеми addSchema
  const { error } = addSchema.validate(req.body);
  if (error) {
    throw HttpError(400, 'missing required name field');
  }

  const { _id: owner } = req.user;

  const result = await Contact.create({ ...req.body, owner });

  res.status(201).json(result);
};

module.exports = addContact;
