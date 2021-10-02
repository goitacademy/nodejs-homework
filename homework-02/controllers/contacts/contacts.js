const { NotFound } = require('http-errors');

const { sendSuccessRes } = require('../../utils');
const contactsOperations = require('../../model/contacts');

const getAllContacts = async (req, res, next) => {
	const contacts = await contactsOperations.getAllContacts();
	sendSuccessRes(res, { contacts });
};

const getContactById = async (req, res, next) => {
	const { id } = req.params;
	const contactById = await contactsOperations.getContactById(id);
	if (!contactById) {
		throw new NotFound(`Product with id=${id} not found`);
	}
	sendSuccessRes(res, { contactById });
};

const addContact = async (req, res, next) => {
	const contact = await contactsOperations.addContact(req.body);
	sendSuccessRes(res, { contact }, 201);
};

const updateContactById = async (req, res, next) => {
	const { id } = req.params;
	const updatedContact = await contactsOperations.updateContactById(
		id,
		req.body,
	);
	// console.log(req.body);
	// console.log(id);
	if (!updatedContact) {
		throw new NotFound(`Product with id=${id} not found`);
	}
	sendSuccessRes(res, { updatedContact });
};

const removeContactById = async (req, res, next) => {
	const { id } = req.params;
	const removedContact = await contactsOperations.removeContactById(id);
	if (!removedContact) {
		throw new NotFound(`Product with id=${id} not found`);
	}
	sendSuccessRes(res, { removedContact });
};

module.exports = {
	getAllContacts,
	getContactById,
	addContact,
	updateContactById,
	removeContactById,
};
