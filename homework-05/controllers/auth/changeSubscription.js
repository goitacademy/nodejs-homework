const changeSubscription = async (req, res) => {
  const { _id } = req.user;
  const { subscription } = req.body;

  await User.findByIdAndUpdate(_id, { subscription });

  // Відправка відповіді клієнту зі статусом 200 (OK) та об'єктом, що містить повідомлення про зміну підписки.
  res.json({
    message: `Your subscription has been changed to ${subscription}`,
  });
};

module.exports = changeSubscription;
