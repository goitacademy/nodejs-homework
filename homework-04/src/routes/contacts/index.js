const express = require('express');
const router = express.Router();
const {
  validateCreateCotact,
  validateUpdateCotact,
  validateUpdateStatusCotact,
} = require('../../validation/contactsValid');
const controllerContacts = require('../../controllers/contacts');
const quard = require('../../helpers/guard');
router
  .get('/', quard, controllerContacts.listContacts)
  .get('/:id', quard, controllerContacts.getById)
  .post('/', quard, validateCreateCotact, controllerContacts.create)
  .put('/:id', quard, validateUpdateCotact, controllerContacts.update)
  .patch('/:id/favorite', quard, validateUpdateStatusCotact, controllerContacts.updateStatus)
  .delete('/:id', quard, controllerContacts.remove);

module.exports = router;
