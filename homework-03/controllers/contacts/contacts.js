const { NotFound } = require('http-errors');

const { sendSuccessRes } = require('../../utils');
const { Contact } = require('../../models/contacts');

const getAllContacts = async (req, res, next) => {
	const contacts = await Contact.find({}, '_id name email phone');
	sendSuccessRes(res, { contacts });
};

const getContactById = async (req, res, next) => {
	const { id } = req.params;
	const contactById = await Contact.findById(id, '_id name email phone');
	if (!contactById) {
		throw new NotFound(`Product with id=${id} not found`);
	}
	sendSuccessRes(res, { contactById });
};

const addContact = async (req, res, next) => {
	const contact = await Contact.create(req.body);
	sendSuccessRes(res, { contact }, 201);
};

const updateContactById = async (req, res, next) => {
	const { id } = req.params;
	const updatedContact = await Contact.findByIdAndUpdate(id, req.body, {
		new: true,
	});
	if (!updatedContact) {
		throw new NotFound(`Product with id=${id} not found`);
	}
	sendSuccessRes(res, { updatedContact });
};

const removeContactById = async (req, res, next) => {
	const { id } = req.params;
	const removedContact = await Contact.findByIdAndDelete(id);
	if (!removedContact) {
		throw new NotFound(`Product with id=${id} not found`);
	}
	sendSuccessRes(res, { removedContact });
};

const updateFavoriteContact = async (req, res, next) => {
	const { id } = req.params;
	const { favorite } = req.body;
	const updatedContact = await Contact.findByIdAndUpdate(
		id,
		{ favorite },
		{
			new: true,
		},
	);
	if (!updatedContact) {
		throw new NotFound(`Product with id=${id} not found`);
	}
	sendSuccessRes(res, { updatedContact });
};

module.exports = {
	getAllContacts,
	getContactById,
	addContact,
	updateContactById,
	removeContactById,
	updateFavoriteContact,
};
