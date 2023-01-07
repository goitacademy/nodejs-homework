const contactsPath = require('../../db/contacts')
const parseJsonData = require('../parseJsonData')
const updateJsonData = require('../updateJsonData')

async function updateById(id,contact) {
    const contacts = await parseJsonData(contactsPath)
    const idx = contacts.findIndex(item => item.id === id)

    if (idx === -1) null

    contacts[idx] = { ...contact, id}

    await updateJsonData(contactsPath, contacts)

    return contacts[idx]
}

module.exports = updateById