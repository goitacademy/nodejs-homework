const { Command } = require("commander");
const contacts = require("./contacts")

const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();


// index.js


// TODO: рефакторить
function invokeAction({ action, id, name, email, phone }) {
    switch (action) {
        case "list":
            contacts.listContacts()
            break;

        case "get":
            if(id){
                contacts.getContactById(id)
            } else {
                console.log("\x1B[31m For get action write id of contact '-i, --id'")
            }
            break;

        case "add":
            if(name && email && phone){
                contacts.addContact(name, email, phone)
            } else {
                console.log("\x1B[31m For add action write name '-n, --name', email '-e, --email' and phone '-p, --phone' of new contact")
            }
            break;

        case "remove":
            if(id){
                contacts.removeContact(id)
            } else {
                console.log("\x1B[31m For remove action write id of contact '-i, --id'")
            }
            break;

        default:
            console.warn("\x1B[31m Unknown action type!");
    }
}

invokeAction(argv);
