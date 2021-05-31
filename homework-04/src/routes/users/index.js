const express = require('express');
const controllerUsers = require('../../controllers/users');
const guard = require('../../helpers/guard');
const { createUser, updateSubscription } = require('../../validation/usersValid');
const { createAccountLimiter } = require('../../helpers/rate-limit');

const router = express.Router();
router
  .post('/registration', createUser, createAccountLimiter, controllerUsers.reg)
  .post('/login', controllerUsers.login)
  .post('/logout', guard, controllerUsers.logout)
  .get('/current', guard, controllerUsers.current)
  .patch('/sub', guard, updateSubscription, controllerUsers.updateSubscription);

module.exports = router;
