const { NotFound } = require('http-errors');

const { sendSuccessRes } = require('../../utils');
const { Contact } = require('../../models/contacts');

const updateContactById = async (req, res, next) => {
	const { id } = req.params;
	const updatedContact = await Contact.findByIdAndUpdate(id, req.body, {
		new: true,
	});
	const { _id, name, email, phone, favorite, owner } = updatedContact;
	if (!updatedContact) {
		throw new NotFound(`Product with id=${id} not found`);
	}
	sendSuccessRes(res, { _id, name, email, phone, favorite, owner });
};

module.exports = updateContactById;
