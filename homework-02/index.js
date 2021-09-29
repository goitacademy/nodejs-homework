const { Command } = require("commander");

const {
  getAllContacts,
  getContactById,
  removeContactById,
  addContact,
} = require("./contacts/index");

const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

function invokeAction({ action, id, name, email, phone }) {
  try {
    switch (action) {
      case "list":
        getAllContacts().then(data => console.table(data)); //node index -a list
        break;

      case "get":
        getContactById(id).then(data => console.table(data)); //node index -a list
        break;

      case "add":
        addContact(name, email, phone).then(data => console.table(data));
        break;

      case "remove":
        removeContactById(id).then(data => console.table(data));
        break;

      default:
        console.warn("\x1B[31m Unknown action type!");
    }
  } catch (err) {
    throw err;
  }
}

invokeAction(argv);
