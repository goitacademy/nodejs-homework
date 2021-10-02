const express = require('express');

const { contacts: ctrl } = require('../../controllers/contacts');
const { controllerWrapper, validation } = require('../../middlewares');
const { contactSchema } = require('../../schemas');

const router = express.Router();

router.get('/', controllerWrapper(ctrl.getAllContacts));

router.get('/:id', controllerWrapper(ctrl.getContactById));

router.post('/', validation(contactSchema), controllerWrapper(ctrl.addContact));

router.put(
	'/:id',
	validation(contactSchema),
	controllerWrapper(ctrl.updateContactById),
);

router.delete('/:id', controllerWrapper(ctrl.removeContactById));

module.exports = router;
