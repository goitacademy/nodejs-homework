const fs = require("fs/promises");
const path = require("path");

const filePath = path.join(__dirname, "..", "..", "db", "contacts.json");

const updateContacts = async newContacts => {
  //перезаписуємо файл констактів
  // console.log(newContacts);
  await fs.writeFile(filePath, JSON.stringify(newContacts));
};

module.exports = updateContacts;
