const express = require('express'); 

const { validateBody, authenticate } = require('../../middlewares'); 
const { schemas } = require('../../models/user');

const router = express.Router(); // Створення екземпляру роутера

const ctrl = require('../../controllers/auth'); // Імпорт контролера для обробки роутів, пов'язаних з аутентифікацією

const { ctrlWrapper } = require('../../helpers'); 

router.post('/register', validateBody(schemas.registerSchema), ctrlWrapper(ctrl.register)); // Маршрут POST для реєстрації користувача, валідація тіла запиту за схемою реєстрації

router.post('/login', validateBody(schemas.loginSchema), ctrlWrapper(ctrl.login)); // Маршрут POST для входу користувача, валідація тіла запиту за схемою входу

router.get('/current', authenticate, ctrlWrapper(ctrl.getCurrent)); // Маршрут GET для отримання поточного користувача, потрібна аутентифікація

router.post('/logout', authenticate, ctrlWrapper(ctrl.logout)); // Маршрут POST для виходу користувача, потрібна аутентифікація

router.patch('/', authenticate, validateBody(schemas.changeSubscriptionSchema), ctrlWrapper(ctrl.changeSubscription)); // Маршрут PATCH для зміни підписки користувача, потрібна аутентифікація та валідація тіла запиту за схемою зміни підписки

module.exports = router; 
