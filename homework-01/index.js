const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require('./contacts');

// listContacts();
// getContactById(2);
// removeContact(8);
// addContact('vera', 'vera@Game.com', ' +456');

const argv = require('yargs').argv;

// TODO: рефакторить
function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      listContacts();
      break;

    case 'get':
      getContactById(id);
      break;

    case 'add':
      addContact(name, email, phone);
      break;

    case 'remove':
      removeContact(id);
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(argv);
