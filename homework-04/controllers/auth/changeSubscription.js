const { User } = require('../../models/user'); 

const changeSubscription = async (req, res) => {
  const { _id } = req.user; 
  const { subscription } = req.body; 
  await User.findByIdAndUpdate(_id, { subscription }); // Оновлення користувача за його _id, з встановленням значення subscription

  res.json({
    message: `Your subscription has been changed to ${subscription}`, // Відправка повідомлення про зміну підписки у відповіді
  }); // Відправка відповіді з повідомленням про зміну підписки у форматі JSON
};

module.exports = changeSubscription; 
