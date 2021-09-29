const fs = require("fs").promises;
const contactsPath = require("../utils/contactsPath");

const removeContactById = async contactId => {
  const allContactsJSON = await fs.readFile(contactsPath, "utf8");
  const allContacts = JSON.parse(allContactsJSON);
  const contactIdx = allContacts.findIndex(contact => contact.id === contactId);
  const removedContact = allContacts.splice(contactIdx, 1);
  // console.log(allContacts);
  fs.writeFile(contactsPath, JSON.stringify(allContacts));
  return `Removing is successful. Contact ${JSON.stringify(
    removedContact,
  )} is deleted`;
};

module.exports = removeContactById;
