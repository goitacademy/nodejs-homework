const contactsPath = require('../../db/contacts')
const parseJsonData = require('../parseJsonData')


async function getById(id) {
    const contacts = await parseJsonData(contactsPath)
    const [contact] = contacts.filter(item => item.id === id)
    return contact
}

module.exports = getById