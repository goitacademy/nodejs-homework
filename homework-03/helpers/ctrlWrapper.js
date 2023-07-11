const ctrlWrapper = ctrl => {
  const func = async (req, res, next) => {
    try {
      await ctrl(req, res, next); // Виклик контролера (функції `ctrl`) з передачею параметрів `req`, `res`, `next`
    } catch (error) {
      next(error); // Передача помилки (об'єкта `error`) на обробку наступному middleware або обробнику помилок
    }
  };

  return func; // Повернення функції `func` в якості обгортки для контролера (функції `ctrl`)
};

module.exports = ctrlWrapper; // Експорт функції `ctrlWrapper` для використання в інших файлах
