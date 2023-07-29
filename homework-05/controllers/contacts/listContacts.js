const listContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 10 } = req.query;

  // Обчислення кількості пропущених контактів (skip) відповідно до номера сторінки та кількості елементів на сторінці
  const skip = (page - 1) * limit;

  if (req.query.favorite) {
    // Визначення, чи користувач хоче побачити улюблені контакти (значення 'true' або 'false')
    const favorite = req.query.favorite === 'true';

    // Пошук контактів у базі даних, які належать користувачу (owner) та є або не є улюбленими (відповідно до параметра 'favorite')
    const result = await Contact.find({ owner, favorite }, '', {
      skip,
      limit,
    }).populate('owner', 'name email');
    return res.json(result);
  }

  // Якщо в запиті не вказано, що показувати улюблені контакти, виконується пошук всіх контактів користувача
  const result = await Contact.find({ owner }, '', { skip, limit }).populate('owner', 'name email');

  res.json(result);
};

module.exports = listContacts;
