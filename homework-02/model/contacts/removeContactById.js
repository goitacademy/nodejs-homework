const fs = require("fs").promises;
const contactsPath = require("../../utils/contactsPath");

const removeContactById = async contactId => {
  const allContactsJSON = await fs.readFile(contactsPath, "utf8");
  console.log(allContactsJSON);
  const allContacts = JSON.parse(allContactsJSON);
  const contactIdx = allContacts.findIndex(contact => contact.id === contactId);
  if (contactIdx === -1) {
    console.log(null);
    return null;
  }
  const removedContact = allContacts.splice(contactIdx, 1);
  console.log(allContacts);
  await fs.writeFile(contactsPath, JSON.stringify(allContacts));
  return JSON.stringify(removedContact);
};

// removeContactById("777");

module.exports = removeContactById;
