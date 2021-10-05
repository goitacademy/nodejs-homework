const { sendSuccessRes } = require('../../utils');
const { Contact } = require('../../models/contacts');

const getAllContacts = async (req, res, next) => {
	const contacts = await Contact.find({}, '_id name email phone');
	sendSuccessRes(res, { contacts });
};

module.exports = getAllContacts;
