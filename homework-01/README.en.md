**Read in other languages: [Russian](README.md), [Ukrainian](README.ua.md).**

# Homework 1

## Step 1

- Initialize npm in the project
- In the root of the project, create a file `index.js`
- Install package [nodemon](https://www.npmjs.com/package/nodemon) as development dependency (devDependencies)
- In `package.json` file add "scripts" to run `index.js`
- `start` script that starts `index.js` with `node`
- `start:dev` script that starts `index.js` with `nodemon`

## Step 2

Create a folder `db` in the root of the project. To store contacts, download and use the [contacts.json](./contacts.json) file, putting it in the `db` folder.

At the root of the project, create a `contacts.js` file.

- Make imports of modules `fs` and `path` to work with the file system
- Create a `contactsPath` variable and put the path to the `contacts.json` file in it. To compose a path, use the methods of the `path` module.
- Add functions to work with a collection of contacts. In functions, use the `fs` module and its `readFile()` and `writeFile()` methods
- Make export of created functions via `module.exports`

```js
// contacts.js

/*
 * Uncomment and write down the value
 * const contactsPath = ;
 */

// TODO: document each function
function listContacts() {
  // ...your code
}

function getContactById(contactId) {
  // ...your code
}

function removeContact(contactId) {
  // ...your code
}

function addContact(name, email, phone) {
  // ...your code
}
```

## Step 3

Make an import of the `contacts.js` module in the `index.js` file and check the functionality of the functions for working with contacts.

## Step 4

The `index.js` file imports the `yargs` package for convenient parsing of command line arguments. Use the ready-made function `invokeAction()` which receives the type of action to be performed and the required arguments. The function calls the appropriate method from the `contacts.js` file, passing it the necessary arguments.

```js
// index.js
const argv = require('yargs').argv;

// TODO: refactor
function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      // ...
      break;

    case 'get':
      // ... id
      break;

    case 'add':
      // ... name email phone
      break;

    case 'remove':
      // ... id
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(argv);
```

Alternatively, you can use the [commander](https://www.npmjs.com/package/commander) module to parse command line arguments. This is a more popular alternative to the `yargs` module

```js
const { Command } = require('commander');
const program = new Command();
program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();

// TODO: refactor
function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      // ...
      break;

    case 'get':
      // ... id
      break;

    case 'add':
      // ... name email phone
      break;

    case 'remove':
      // ... id
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(argv);
```

## Step 5

Run the commands in the terminal and take a separate screenshot of the result of each command.

```shell
# Get and display the entire list of contacts in the form of a table (console.table)
node index.js --action list

# Get contact by id
node index.js --action get --id 5

# Add the contact
node index.js --action add --name Mango --email mango@gmail.com --phone 322-22-22

# Delete the contact
node index.js --action remove --id 3
```

## Step 6 - Homework submission

Command execution screenshots can be uploaded to any free cloud image storage service (Example: [monosnap](https://monosnap.com/), [imgbb.com](https://imgbb.com/)) and the corresponding links are necessary add to the README.md file. Create this file at the root of the project. Then attach a link to the homework repository at [schoology](https://app.schoology.com/login) for mentor to check.

## Admission criteria

- You created a repository with homework &mdash; CLI application
- The assignment has been sent to the mentor at [schoology](https://app.schoology.com/login) for review (repository link)
- The code corresponds to the terms of reference of the project
- No unhandled errors when executing code
- The names of variables, properties and methods start with a lowercase letter and are written in CamelCase notation. English nouns are used
- The name of the function or method contains a verb
- There are no commented sections of code in the code
- The project works correctly in the current LTS version of Node
