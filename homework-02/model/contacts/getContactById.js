const fs = require("fs").promises;
const contactsPath = require("../../utils/contactsPath");

const getContactById = async contactId => {
  console.log(contactId);
  const allContactsJSON = await fs.readFile(contactsPath, "utf8");
  const contactById = JSON.parse(allContactsJSON).find(
    contact => contact.id === contactId,
  );
  if (!contactById) {
    return null;
  }
  return contactById;
};

module.exports = getContactById;
