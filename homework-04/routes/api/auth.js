const express = require('express');

const { controllerWrapper, validation } = require('../../middlewares');
const { auth: ctrl } = require('../../controllers/auth');
const { joiSchema } = require('../../models/auth/authSchema');

const router = express.Router();

/*
1. Реєстрація нового користувача;
2. Аутинтифікація (логін) зареєстрованого користувача;
3. Авторизація аутинтифікованого (того, що зайшов на сайт) користувача;
4. Вихід(Логаут)
*/

// api/auth/register - повний шлях

router.post('/signup', validation(joiSchema), controllerWrapper(ctrl.signup));
// router.post("/register");

router.post('/login', validation(joiSchema), controllerWrapper(ctrl.login));
// router.post("/signin")

router.get('/logout', controllerWrapper(ctrl.logout));
// router.post("/signout")

module.exports = router;
