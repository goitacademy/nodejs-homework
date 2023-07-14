const ctrlWrapper = ctrl => {
  const func = async (req, res, next) => {
    try {
      await ctrl(req, res, next); // Виклик контролера `ctrl` з переданими параметрами req, res, next за допомогою ключового слова `await`, щоб обробити асинхронні операції
    } catch (error) {
      next(error); // Якщо виникає помилка, передаємо її в наступний middleware за допомогою `next()`
    }
  };

  return func; // Повертаємо обгортку функції `ctrl`
};

module.exports = ctrlWrapper; 
