const { sendSuccessRes } = require('../../utils');
const { Contact } = require('../../models/contacts');

const addContact = async (req, res, next) => {
	// console.log(req.user._id);
	const newContact = { ...req.body, owner: req.user._id };
	const result = await Contact.create(newContact);
	const { _id, name, email, phone, favorite, owner } = result;
	sendSuccessRes(res, { _id, name, email, phone, favorite, owner }, 201);
};

module.exports = addContact;
