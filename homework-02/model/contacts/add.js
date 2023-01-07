const { v4 } = require('uuid');

const contactsPath = require('../../db/contacts')
const parseJsonData = require('../parseJsonData')
const updateJsonData = require('../updateJsonData')


async function add({name, email, phone}) {
    const contacts = await parseJsonData(contactsPath)

    const newContact = { name, email, phone, id: v4() }

    contacts.push(newContact)

    await updateJsonData(contactsPath, contacts)

    return newContact
}

module.exports = add