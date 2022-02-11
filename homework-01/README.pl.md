**Читать на других языках: Czytaj w innych językach: [rosyjski](README.md), [ukraiński](README.ua.md).**

# Домашнее задание 1 Praca domowa 1

## Шаг 1 Krok 1

- Инициализируй npm в проекте Zainicjalizuj npm w projekcie.
- В корне проекта создай файл `index.js` W root projektu utwórz plik `index.js`.
- Поставь пакет [nodemon](https://www.npmjs.com/package/nodemon) как зависимость разработки (devDependencies) Ustaw pakiet [nodemon](https://www.npmjs.com/package/nodemon) jako zależność opracowywania (devDependencies).
- В файле `package.json` добавь "скрипты" для запуска `index.js` Do pliku `package.json` dodaj "skrytpy" dla włączenia `index.js`.
- Скрипт `start` который запускает `index.js` с помощью `node` Skrypt `start`, który uruchamia `index.js` przy pomocy `node`.
- Скрипт `start:dev` который запускает `index.js` с помощью `nodemon` Skrypt `start:dev`, który uruchamia `index.js` przy pomocy `nodemon`.

## Шаг 2 Krok 2

В корне проекта создай папку `db`. Для хранения контактов скачай и используй файл [contacts.json](./contacts.json), положив его в папку `db`.

W root projektu utwórz plik `db`. Dla zapisywania kontaktów ściągnij i wykorzystaj plik [contacts.json](./contacts.json), umieszczając go w folderze `db`.

В корне проекта создай файл `contacts.js`. W root projektu utwórz plik `contacts.js`.

- Сделай импорт модулей `fs` и `path` для работы с файловой системой
- Zaimportuj moduły `fs` i `path` do pracy z systemem plików.
- Создай переменную `contactsPath` и запиши в нее путь к файле `contacts.json`. Для составления пути используй методы модуля `path`.
- Utwórz zmienną `contactsPath` i zapisz w niej ścieżkę do pliku `contacts.json`. Do utworzenia ściezki wykorzystah metody modułu `path`.
- Добавь функции для работы с коллекцией контактов. В функциях используй модуль `fs` и его методы `readFile()` и `writeFile()`
- Dodaj funkcję do pracy ze zbiorem kontaktów. W funcjach wykorzystaj moduł `fs` oraz jego metody `readFile()` i `writeFile()`
- Сделай экспорт созданных функций через `module.exports`
- Zrób eksport utworzonych funkcji przez `module.exports`.

```js
// contacts.js

/*
 * Раскомментируй и запиши значение Skomentuj i zapisz wartość
 * const contactsPath = ;
 */

// TODO: задокументировать каждую функцию udokumentuj każdą funkcję
function listContacts() {
  // ...твой код twój kod
}

function getContactById(contactId) {
  // ...твой код twój kod
}

function removeContact(contactId) {
  // ...твой код twój kod
}

function addContact(name, email, phone) {
  // ...твой код twój kod
}
```

## Шаг 3 Krok 3

Сделай импорт модуля `contacts.js` в файле `index.js` и проверь работоспособность функций для работы с контактами.
Utwórz import modułu `contacts.js` w pliku `index.js` i sprawdź wydajność funkcji dla pracy z kontaktami.

## Шаг 4 Krok 4

В файле `index.js` импортируется пакет `yargs` для удобного парса аргументов командной строки. Используй готовую функцию `invokeAction()` которая получает тип выполняемого действия и необходимые аргументы. Функция вызывает соответствующий метод из файла `contacts.js` передавая ему необходимые аргументы.

W pliku `index.js` importuje się pakiet `yargs` dla wygodnego parserowania argumentów wiersza poleceń. Wykorzystuaj gotową funkcję `invokeAction()`, która otrzymuje typ wykonywanego działania i niezbędne argumenty. Funkcja wywołuje odpowiednią metodę z pliku `contacts.js`, przekazując mu niezbędne argumenty.

```js
// index.js
const argv = require('yargs').argv;

// TODO: рефакторить refaktor
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

Możesz wykorzystać moduł [commander](https://www.npmjs.com/package/commander) do parserowania argumentów wiersza poleceń. To populatniejsza alternatywa modułu `yargs`.

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

// TODO: рефакторить refaktoring
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

## Шаг 5 Krok 5

Запусти команды в терминале и сделай отдельный скриншот результата выполнения каждой команды.

```shell
# Получаем и выводим весь список контактов в виде таблицы (console.table)
Otrzymujemy i wyprowadzamy całą listę kontaktów w postaci tabeli (console.table)
node index.js --action list

# Получаем контакт по id Otrzymujemy kontakt po id
node index.js --action get --id 5

# Добавялем контакт Dodajemy kontakt
node index.js --action add --name Mango --email mango@gmail.com --phone 322-22-22

# Удаляем контакт Usuwamy kontakt
node index.js --action remove --id=3
```

## Шаг 6 - Сдача домашнего задания. Oddanie pracy domowej

Скриншоты выполнения команд, можно залить на любой бесплатный облачный сервис хранения картинок (Пример: [monosnap](https://monosnap.com/), [imgbb.com](https://imgbb.com/)) и соответствующие ссылки необходимо добавить в файл README.md. Создайте этот файл в корне проекта. После прикрепите ссылку на репозиторий с домашним заданием в [schoology](https://app.schoology.com/login) для проверки ментором.

Screenshoty wykonania poleceń można wysłać na dowolną, bezpłatną chmurę zapisywania obrazów (Przykład: [monosnap](https://monosnap.com/), [imgbb.com](https://imgbb.com/)) i odpowiednie odnośniki należy dodać do pliku README.md. Utwórz ten plik w root projektu. Następnie dodaj odnośnik do repozytorium z pracą domową do [schoology](https://app.schoology.com/login) dla sprawdzenia przez mentora.

## Критерии приема Kryteria zaliczenia

- Создан репозиторий с домашним заданием &mdash; CLI приложение
- Utworzone repozytorium z pracą domową &mdash; CLI aplikacja.
- Задание отправлено ментору в [schoology](https://app.schoology.com/login) на проверку (ссылка на репозиторий)
- Zadanie wysłane do mentora na [schoology](https://app.schoology.com/login) w celu sprawdzenia (odnośnik do repozytorium).
- Код соответствует техническому заданию проекта
- Kod odpowiada 
- При выполнении кода не возникает необработанных ошибок
- Название переменных, свойств и методов начинается со строчной буквы и записываются в нотации CamelCase. Используются английские существительные
- Название функции или метода содержит глагол
- В коде нет закомментированных участков кода
- Проект корректно работает в актуальной LTS-версии Node
