const getCurrent = async (req, res) => {
  const { name, email, subscription } = req.user; 

  res.json({
    name, 
    email, 
    subscription, 
  }); // Відправка відповіді з даними поточного користувача у форматі JSON
};

module.exports = getCurrent; 
