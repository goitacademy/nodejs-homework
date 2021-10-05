const getAllContacts = require('./getAllContacts');
const getContactById = require('./getContactById');
const addContact = require('./addContact');
const updateContactById = require('./updateContactById');
const removeContactById = require('./removeContactById');
const updateFavoriteContact = require('./updateFavoriteContact');

const contacts = {
	getAllContacts,
	getContactById,
	addContact,
	updateContactById,
	removeContactById,
	updateFavoriteContact,
};

module.exports = {
	contacts,
};
