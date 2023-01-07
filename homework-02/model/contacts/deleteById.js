const contactsPath = require('../../db/contacts')
const parseJsonData = require('../parseJsonData')
const updateJsonData = require('../updateJsonData')


async function deleteById(id) {
    const contacts = await parseJsonData(contactsPath)
    const idx = contacts.findIndex(item => item.id === id)

    if (idx === -1) null
    
    const [deletedContact] = contacts.splice(idx, 1)
    updateJsonData(contactsPath, contacts)
    return deletedContact
}

module.exports = deleteById