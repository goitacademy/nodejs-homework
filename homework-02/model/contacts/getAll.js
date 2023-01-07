const contactsPath = require('../../db/contacts')
const parseJsonData = require('../parseJsonData')


async function getAll() {
    const contacts = await parseJsonData(contactsPath)
    return contacts
}

module.exports = getAll