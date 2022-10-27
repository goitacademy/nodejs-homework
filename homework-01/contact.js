const fs = require('fs/promises');
const path = require('path');
const { v4 } = require('uuid');

const contactsPath = path.resolve('db/contacts.json');

// TODO: задокументировать каждую функцию
async function listContacts() {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  return contacts;
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const result = contacts.find(contact => contact.id == contactId);
  console.log(result);
  if (!result) {
    return null;
  }
  return result;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const idx = contacts.findIndex(contact => contact.id == contactId);
  if (idx === -1) {
    return null;
  }
  const newContacts = contacts.filter((_, index) => index !== idx);

  await fs.writeFile(contactsPath, JSON.stringify(newContacts));
  //   console.log(contacts);
  console.log(contacts[idx]);
  return contacts[idx];
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newContacts = { name, email, phone, id: v4() };
  contacts.push(newContacts);
  //   console.table(contacts);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  console.log(newContacts);
  return newContacts;
}

module.exports = { listContacts, getContactById, removeContact, addContact };
