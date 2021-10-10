const { sendSuccessRes } = require('../../utils');
const { Contact } = require('../../models/contacts');

const getAllContacts = async (req, res, _next) => {
	const { _id } = req.user;
	if (req.query.page && req.query.limit) {
		const page = Number(req.query.page);
		const limit = Number(req.query.limit);

		const options = {
			page: page,
			limit: limit,
		};

		const paginatedContact = [];
		let result = [];

		if (req.query.favorite && req.query.favorite === 'true') {
			const allContacts = await Contact.find(
				{ owner: _id },
				'_id name email phone owner favorite',
			);
			allContacts.forEach(contact => {
				if (contact.favorite === true) {
					paginatedContact.push(contact);
					console.log(contact);
				}
			});
			result = paginatedContact.slice(page * limit - 2, limit * page);
			sendSuccessRes(res, { result });
		} else {
			const contacts = await Contact.paginate(
				Contact.find({ owner: _id }, '_id name email phone owner favorite'),
				options,
			);
			sendSuccessRes(res, { contacts });
		}
	}
};

module.exports = getAllContacts;
