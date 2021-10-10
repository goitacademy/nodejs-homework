const express = require('express');

const {
	controllerWrapper,
	validation,
	authenticate,
} = require('../../middlewares');
const { users: ctrl } = require('../../controllers/users');
const { joiSchema } = require('../../models/users/authSchema');
const { updateUserSubscription } = require('../../models/users/authSchema');

const router = express.Router();

/*
1. Реєстрація нового користувача;
2. Аутинтифікація (логін) зареєстрованого користувача;
3. Авторизація аутинтифікованого (того, що зайшов на сайт) користувача;
4. Вихід(Логаут)
*/

// api/users/register - повний шлях

router.post('/signup', validation(joiSchema), controllerWrapper(ctrl.signup));
// router.post("/register");

router.post('/login', validation(joiSchema), controllerWrapper(ctrl.login));
// router.post("/signin")

router.get('/logout', authenticate, controllerWrapper(ctrl.logout));
// router.post("/signout")

router.get('/current', authenticate, controllerWrapper(ctrl.getCurrentUser));

router.patch(
	'/',
	authenticate,
	validation(updateUserSubscription),
	controllerWrapper(ctrl.updateUserSubscription),
);

module.exports = router;
