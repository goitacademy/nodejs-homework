const { NotFound } = require('http-errors');

const { sendSuccessRes } = require('../../utils');
const { Contact } = require('../../models/contacts');

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

module.exports = updateFavoriteContact;
