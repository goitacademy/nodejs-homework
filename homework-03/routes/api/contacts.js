const express = require('express'); // Підключення модуля express для створення роутера
const router = express.Router(); // Створення нового роутера за допомогою express.Router()
const ctrl = require('../../controllers/contacts'); // Підключення модуля контролерів з папки ../../controllers/contacts
const isValidId = require('../../middlewares'); // Підключення middleware для перевірки валідності ідентифікатора

router.get('/', ctrl.listContacts); // Обробник маршруту GET '/' - виклик функції listContacts контролера
router.get('/:id', ctrl.getById); // Обробник маршруту GET '/:id' - виклик функції getById контролера
router.post('/', ctrl.addContact); // Обробник маршруту POST '/' - виклик функції addContact контролера
router.put('/:id', ctrl.updateById); // Обробник маршруту PUT '/:id' - виклик функції updateById контролера
router.patch('/:id/favorite', isValidId, ctrl.updateStatusContact); // Обробник маршруту PATCH '/:id/favorite' - виклик функції updateStatusContact контролера з попередньою перевіркою валідності ідентифікатора
router.delete('/:id', ctrl.removeContact); // Обробник маршруту DELETE '/:id' - виклик функції removeContact контролера

module.exports = router; // Експорт створеного роутера для використання в інших файлів
