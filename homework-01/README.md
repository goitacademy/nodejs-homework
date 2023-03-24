**Читать на других языках: [Русский](README.md), [Українська](README.ua.md).**

# Домашнее задание 1

## Шаг 1

- Инициализируй npm в проекте
- В корне проекта создай файл `index.js`
- Поставь пакет [nodemon](https://www.npmjs.com/package/nodemon) как зависимость разработки (devDependencies)
- В файле `package.json` добавь "скрипты" для запуска `index.js`
- Скрипт `start` который запускает `index.js` с помощью `node`
- Скрипт `start:dev` который запускает `index.js` с помощью `nodemon`

## Шаг 2

В корне проекта создай папку `db`. Для хранения контактов скачай и используй файл [contacts.json](./contacts.json), положив его в папку `db`.

В корне проекта создай файл `contacts.js`.

- Сделай импорт модулей `fs` и `path` для работы с файловой системой
- Создай переменную `contactsPath` и запиши в нее путь к файле `contacts.json`. Для составления пути используй методы модуля `path`.
- Добавь функции для работы с коллекцией контактов. В функциях используй модуль `fs` и его методы `readFile()` и `writeFile()`
- Сделай экспорт созданных функций через `module.exports`

```js
// contacts.js

/*
 * Раскомментируй и запиши значение
 * const contactsPath = ;
 */

// TODO: задокументировать каждую функцию
function listContacts() {
  // ...твой код
}

function getContactById(contactId) {
  // ...твой код
}

function removeContact(contactId) {
  // ...твой код
}

function addContact(name, email, phone) {
  // ...твой код
}
```

## Шаг 3

Сделай импорт модуля `contacts.js` в файле `index.js` и проверь работоспособность функций для работы с контактами.

## Шаг 4

В файле `index.js` импортируется пакет `yargs` для удобного парса аргументов командной строки. Используй готовую функцию `invokeAction()` которая получает тип выполняемого действия и необходимые аргументы. Функция вызывает соответствующий метод из файла `contacts.js` передавая ему необходимые аргументы.

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

Так же, вы можете использовать модуль [commander](https://www.npmjs.com/package/commander) для парсинга аргументов командной строки. Это более популярная альтернатива модуля `yargs`

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

## Шаг 5

Запусти команды в терминале и сделай отдельный скриншот результата выполнения каждой команды.

```shell
# Получаем и выводим весь список контактов в виде таблицы (console.table)
node index.js --action list

# Получаем контакт по id
node index.js --action get --id 05olLMgyVQdWRwgKfg5J6

# Добавялем контакт
node index.js --action add --name Mango --email mango@gmail.com --phone 322-22-22

# Удаляем контакт
node index.js --action remove --id qdggE76Jtbfd9eWJHrssH
```

## Шаг 6 - Сдача домашнего задания.

Скриншоты выполнения команд, можно залить на любой бесплатный облачный сервис хранения картинок (Пример: [monosnap](https://monosnap.com/), [imgbb.com](https://imgbb.com/)) и соответствующие ссылки необходимо добавить в файл README.md. Создайте этот файл в корне проекта. После прикрепите ссылку на репозиторий с домашним заданием в [schoology](https://app.schoology.com/login) для проверки ментором.

## Критерии приема

- Создан репозиторий с домашним заданием &mdash; CLI приложение
- Задание отправлено ментору в [schoology](https://app.schoology.com/login) на проверку (ссылка на репозиторий)
- Код соответствует техническому заданию проекта
- При выполнении кода не возникает необработанных ошибок
- Название переменных, свойств и методов начинается со строчной буквы и записываются в нотации CamelCase. Используются английские существительные
- Название функции или метода содержит глагол
- В коде нет закомментированных участков кода
- Проект корректно работает в актуальной LTS-версии Node
