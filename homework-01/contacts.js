const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');

const contactsPath = path.join('./db', 'contacts.json');

// TODO: задокументировать каждую функцию
async function listContacts() {
  await fs.readFile(`${contactsPath}`, 'utf8', (err, data) => {
    let obj;
    if (err) throw err;
    obj = JSON.parse(data);

    console.table(obj);
  });
}

async function getContactById(contactId) {
  await fs.readFile(`${contactsPath}`, 'utf8', (err, data) => {
    let obj;
    if (err) throw err;

    obj = JSON.parse(data).filter(item => item.id === contactId);
    console.table(obj);
  });
}

async function removeContact(contactId) {
  let contacts;
  await fs.readFile(`${contactsPath}`, 'utf8', (err, data) => {
    if (err) throw err;

    contacts = JSON.parse(data).filter(item => item.id !== contactId);
    let contactsString = JSON.stringify(contacts);

    fs.writeFile(`./db/newcontacts.json`, contactsString, 'utf8', err => {
      if (err) throw err;
      let newContactsList = JSON.parse(contactsString);
      console.table(newContactsList);
    });
  });
}

async function addContact(name, email, phone) {
  let contacts;
  await fs.readFile(`${contactsPath}`, 'utf8', (err, data) => {
    if (err) throw err;

    contacts = JSON.parse(data);

    let contact = { id: uuidv4(), name, email, phone };

    contacts.push(contact);
    let contactsString = JSON.stringify(contacts);

    fs.writeFile(`./db/newAddContact.json`, contactsString, function (err) {
      if (err) throw err;

      let newContactsList = JSON.parse(contactsString);
      console.table(newContactsList);
    });
  });
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
