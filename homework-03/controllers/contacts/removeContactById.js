const { NotFound } = require('http-errors');

const { sendSuccessRes } = require('../../utils');
const { Contact } = require('../../models/contacts');

const removeContactById = async (req, res, next) => {
	const { id } = req.params;
	const removedContact = await Contact.findByIdAndDelete(id);
	if (!removedContact) {
		throw new NotFound(`Product with id=${id} not found`);
	}
	sendSuccessRes(res, { removedContact });
};

module.exports = removeContactById;
