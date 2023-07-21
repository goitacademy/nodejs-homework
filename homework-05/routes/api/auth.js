const express = require('express');
const { validateBody, authenticate, upload } = require('../../middlewares');
const { schemas } = require('../../models/user');

const router = express.Router();

const ctrl = require('../../controllers/auth');
const { ctrlWrapper } = require('../../helpers');

router.post(
  '/register',
  validateBody(schemas.registerSchema),
  ctrlWrapper(ctrl.register), // Обробка запиту контролером register
);

router.post('/login', validateBody(schemas.loginSchema), ctrlWrapper(ctrl.login));

router.get('/current', authenticate, ctrlWrapper(ctrl.getCurrent)); // Встановлення маршруту GET з middleware автентифікації до обробки контролером getCurrent

router.post('/logout', authenticate, ctrlWrapper(ctrl.logout));

router.patch(
  '/users/avatars',
  authenticate,
  upload.single('avatar'), // Використання middleware upload для завантаження одного файла з ім'ям "avatar"
  ctrlWrapper(ctrl.updateAvatar), // Обробка запиту контролером updateAvatar
);

router.patch('/', authenticate, validateBody(schemas.changeSubscriptionSchema), ctrlWrapper(ctrl.changeSubscription));

module.exports = router;
