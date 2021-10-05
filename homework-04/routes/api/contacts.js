const express = require('express');

const {
	joiContactSchema,
	updateFavoriteContactJoiSchema,
} = require('../../models/contacts/contactSchema');
const { controllerWrapper, validation } = require('../../middlewares');
const { contacts: ctrl } = require('../../controllers/contacts');

const router = express.Router();

router.get('/', controllerWrapper(ctrl.getAllContacts));

router.get('/:id', controllerWrapper(ctrl.getContactById));

router.post(
	'/',
	validation(joiContactSchema),
	controllerWrapper(ctrl.addContact),
);

router.put(
	'/:id',
	validation(joiContactSchema),
	controllerWrapper(ctrl.updateContactById),
);

router.patch(
	'/:id',
	validation(updateFavoriteContactJoiSchema),
	controllerWrapper(ctrl.updateFavoriteContact),
);
router.delete('/:id', controllerWrapper(ctrl.removeContactById));

module.exports = router;
