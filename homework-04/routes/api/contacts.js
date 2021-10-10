const express = require('express');

const {
	joiContactSchema,
	updateFavoriteContactJoiSchema,
} = require('../../models/contacts/contactSchema');
const {
	controllerWrapper,
	validation,
	authenticate,
} = require('../../middlewares');
const { contacts: ctrl } = require('../../controllers/contacts');

const router = express.Router();

router.get('/', authenticate, controllerWrapper(ctrl.getAllContacts));

router.get('/:id', authenticate, controllerWrapper(ctrl.getContactById));

router.post(
	'/',
	authenticate,
	validation(joiContactSchema),
	controllerWrapper(ctrl.addContact),
);

router.put(
	'/:id',
	authenticate,
	validation(joiContactSchema),
	controllerWrapper(ctrl.updateContactById),
);

router.patch(
	'/:id',
	authenticate,
	validation(updateFavoriteContactJoiSchema),
	controllerWrapper(ctrl.updateFavoriteContact),
);
router.delete('/:id', authenticate, controllerWrapper(ctrl.removeContactById));

module.exports = router;
