const express = require('express'); 

const router = express.Router(); // Створення екземпляру роутера

const ctrl = require('../../controllers/contacts'); 

const { ctrlWrapper } = require('../../helpers'); 

const { isValidId, authenticate } = require('../../middlewares'); // Імпорт middlewares для перевірки дійсності ID та аутентифікації користувача

router.get('/', authenticate, ctrlWrapper(ctrl.listContacts)); // Маршрут GET для отримання списку контактів, потрібна аутентифікація

router.get('/:id', authenticate, isValidId, ctrlWrapper(ctrl.getById)); // Маршрут GET для отримання конкретного контакту за ID, потрібна аутентифікація та перевірка дійсності ID

router.post('/', authenticate, ctrlWrapper(ctrl.addContact)); // Маршрут POST для створення нового контакту, потрібна аутентифікація

router.put('/:id', authenticate, isValidId, ctrlWrapper(ctrl.updateById)); // Маршрут PUT для оновлення контакту за ID, потрібна аутентифікація та перевірка дійсності ID

router.patch('/:id/favorite', authenticate, isValidId, ctrlWrapper(ctrl.updateStatusContact)); // Маршрут PATCH для оновлення статусу "favorite" контакту за ID, потрібна аутентифікація та перевірка дійсності ID

router.delete('/:id', authenticate, isValidId, ctrlWrapper(ctrl.removeContact)); // Маршрут DELETE для видалення контакту за ID, потрібна аутентифікація та перевірка дійсності ID

module.exports = router; 
