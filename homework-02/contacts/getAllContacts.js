const fs = require("fs").promises;
const contactsPath = require("../utils/contactsPath");

const getAllContacts = async () => {
  const allContactsJSON = await fs.readFile(contactsPath, "utf8");
  const allContacts = JSON.parse(allContactsJSON);
  return allContacts;
};

module.exports = getAllContacts;
