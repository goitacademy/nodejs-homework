**Читать на других языках: [Русский](README.md), [Українська](README.ua.md).**

# Домашнє завдання 1

Створи гілку `01-node-basics` з гілки `master`.

## Крок 1

- Ініціалізується npm в проекті
- В корені проекту створи файл `index.js`
- Постав пакет [nodemon](https://www.npmjs.com/package/nodemon) як залежність
  [nodemon](https://www.npmjs.com/package/nodemon) як залежність розробки
  (devDependencies)
- В файлі `package.json` додай "скрипти" для запуску `index.js`
  - Скрипт `start` який запускає `index.js` с помощью `node`
  - Скрипт `dev` який запускає `index.js` за допомогою `nodemon`

## Крок 2

У корені проекту створи папку `db`. Ддля зберігання контактів завантаж і
використовуй файл [contacts.json](./contacts.json), поклавши його в папку `db`.

У корені проекту створи файл `contacts.js`.

- Зроби імпорт модулів `fs` і `path` для роботи з файловою системою
- Створи змінну `contactsPath` і запиши в неї шлях до файлі `contacts.json`. Для
  складання шляху використовуй методи модуля `path`.
- Додай функції для роботи з колекцією контактів. У функціях використовуй модуль
  `fs` и его методы `readFile()` і `writeFile()`
- Зроби експорт створених функцій через `module.exports`

```js
// contacts.js

/*
 * Розкоментуйте і запиши значення
 * const contactsPath = ;
 */

// TODO: задокументувати кожну функцію
function listContacts() {
  // ...твій код
}

function getContactById(contactId) {
  // ...твій код
}

function removeContact(contactId) {
  // ...твій код
}

function addContact(name, email, phone) {
  // ...твій код
}
```

## Крок 3

Зроби імпорт модуля `contacts.js` в файлі `index.js` и проверь работоспособность
функций для работы с контактами.

## Крок 4

В файлі `index.js` імпортується пакет `yargs` для зручного парса аргументів
командного рядка. Використовуй готову функцію `invokeAction()` яка отримує тип
виконуваної дії і необхідні аргументи. Функція викликає відповідний метод з
файлу `contacts.js` передаючи йому необхідні аргументи.

```js
// index.js
const argv = require('yargs').argv;

// TODO: рефакторить
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

## Крок 5

Запусти команди в терміналі і зроби окремий скріншот результату виконання кожної
команди.

```shell
# Отримуємо і виводимо весь список контактів у вигляді таблиці (console.table)
node index.js --action="list"

# Отримуємо контакт по id
node index.js --action="get" --id=5

# Добавялем контакт
node index.js --action="add" --name="Mango" --email="mango@gmail.com" --phone="322-22-22"

# Видаляємо контакт
node index.js --action="remove" --id=3
```
