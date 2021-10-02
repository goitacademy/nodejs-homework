const updateContacts = require("./updateContacts");
const getAllContacts = require("./getAllContacts");

const updateContactById = async (id, data) => {
  const contacts = await getAllContacts();
  const idx = contacts.findIndex(item => item.id === id);
  if (idx === -1) {
    return null;
  }
  const updateContact = { ...contacts[idx], ...data };
  // console.log(updateContact);
  contacts[idx] = updateContact;
  await updateContacts(contacts);
  // console.log("contacts", contacts);
  return updateContact;
};
// updateContactById("dacbV1MoVcNUxbaHXOTY-", {
//   name: "Enrico Banucci",
//   email: "banucci.e@gmail.com",
//   phone: "5664432099002",
// });

module.exports = updateContactById;
