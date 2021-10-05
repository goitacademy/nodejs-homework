const { sendSuccessRes } = require('../../utils');
const { Contact } = require('../../models/contacts');

const addContact = async (req, res, next) => {
	const contact = await Contact.create(req.body);
	sendSuccessRes(res, { contact }, 201);
};

module.exports = addContact;
