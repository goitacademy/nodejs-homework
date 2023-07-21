const ctrlWrapper = ctrl => {
  const func = async (req, res, next) => {
    try {
      // Виклик контролера з передачею йому об'єкта запиту (req), об'єкта відповіді (res) та функції next
      await ctrl(req, res, next);
    } catch (error) {
      next(error);
    }
  };

  return func;
};

module.exports = ctrlWrapper;
