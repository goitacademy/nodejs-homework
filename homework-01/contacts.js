const fs = require('fs').promises
const path = require('path')

const contactsPath = path.resolve('./db/contacts.json')
const coding = 'utf8'


async function parseContacts() {
    try {
        const listJSON = await fs.readFile(contactsPath, coding)
        const list = JSON.parse(listJSON)

        return list
    } catch (error) {
        console.error(error)
    }
}

async function listContacts() {
    const list = await parseContacts()
    console.table(list)
}

async function getContactById(contactId) {
    const list = await parseContacts()
    const [contact] = list.filter(item => Number(item.id)  === Number(contactId))
 
    console.log(contact)
}


async function removeContact(contactId) {
    const list = await parseContacts()

    const newList = list.filter(item => Number(item.id) !== Number(contactId))
    
    
    if (list.length === newList.length) {
        console.log("Don`t find id")
    } else {
        
        fs.writeFile(contactsPath, JSON.stringify(newList, null, '\t'))
            .then(() => {
                console.log("Done")
            })
            .catch(err => {
                console.error(err)
            })
    }
}


async function addContact(name, email, phone) {
    const list = await parseContacts()
    
    const listLastIdx = list.length - 1
    const id = Number(list[listLastIdx].id) + 1 +""

    const newContact = { name, email, phone, id }

    list.push(newContact)


    fs.writeFile(contactsPath, JSON.stringify(list, null, '\t'))
        .then(() => {
            console.log(`New contact ${newContact.name} added`)
        })
        .catch(err => {
            console.error(err)
        })
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
    parseContacts
}