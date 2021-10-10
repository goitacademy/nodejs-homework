const { NotFound } = require('http-errors');

const { sendSuccessRes } = require('../../utils');
const { Contact } = require('../../models/contacts');

const getContactById = async (req, res, next) => {
	const { id } = req.params;
	const contactById = await Contact.findById(id, '_id name email phone owner');
	if (!contactById) {
		throw new NotFound(`Product with id=${id} not found`);
	}
	sendSuccessRes(res, { contactById });
};

module.exports = getContactById;
