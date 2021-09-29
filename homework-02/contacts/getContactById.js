const fs = require("fs").promises;
const contactsPath = require("../utils/contactsPath");

const getContactById = async contactId => {
  const allContactsJSON = await fs.readFile(contactsPath, "utf8");
  const contactById = JSON.parse(allContactsJSON).filter(
    contact => contact.id === contactId,
  );
  return contactById;
};

module.exports = getContactById;
