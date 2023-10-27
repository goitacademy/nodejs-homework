**Czytaj w innych językach: [rosyjski](README.md), [ukraiński](README.ua.md).**

# Zadanie domowe 1

## Krok 1

- Zainicjalizuj npm w projekcie.
- W root projektu utwórz plik `index.js`.
- Ustaw pakiet [nodemon](https://www.npmjs.com/package/nodemon) jako zależność opracowywania (devDependencies).
- Do pliku `package.json` dodaj "skrypty" dla włączenia `index.js`.
- Skrypt `start`, który uruchamia `index.js` przy pomocy `node`.
- Skrypt `start:dev`, który uruchamia `index.js` przy pomocy `nodemon`.

## Krok 2

W root projektu utwórz plik `db`. Do zapisywania kontaktów ściągnij i wykorzystaj plik [contacts.json](./contacts.json), umieszczając go w folderze `db`.

W root projektu utwórz plik `contacts.js`.

- Zaimportuj moduły `fs` i `path` do pracy z systemem plików.
- Utwórz zmienną `contactsPath` i zapisz w niej ścieżkę do pliku `contacts.json`. Do utworzenia ścieżki wykorzystaj metody modułu `path`.
- Dodaj funkcję do pracy ze zbiorem kontaktów. W funcjach wykorzystaj moduł `fs` oraz jego metody `readFile()` i `writeFile()`.
- Wyeksportuj utworzonych funkcji przez `module.exports`.

```js
// contacts.js

/*
 * Skomentuj i zapisz wartość
 * const contactsPath = ;
 */

// TODO: udokumentuj każdą funkcję
function listContacts() {
  // ...twój kod
}

function getContactById(contactId) {
  // ...twój kod
}

function removeContact(contactId) {
  // ...twój kod
}

function addContact(name, email, phone) {
  // ...twój kod
}
```

## Krok 3

Zaimportuj modułu `contacts.js` w pliku `index.js` i sprawdź wydajność funkcji dla pracy z kontaktami.

## Krok 4

W pliku `index.js` importuje się pakiet `yargs` dla wygodnego parserowania argumentów wiersza poleceń. Wykorzystaj gotową funkcję `invokeAction()`, która otrzymuje typ wykonywanego działania i niezbędne argumenty. Funkcja wywołuje odpowiednią metodę z pliku `contacts.js`, przekazując mu niezbędne argumenty.

```js
// index.js
const argv = require('yargs').argv;

// TODO: refaktor
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

Możesz wykorzystać moduł [commander](https://www.npmjs.com/package/commander) do parserowania argumentów wiersza poleceń. To popularniejsza alternatywa modułu `yargs`.

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

// TODO: refaktor
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

## Krok 5

Uruchom polecenia w terminalu i zrób oddzielne screenshoty wyników wykonania każdego polecenia.

```shell
# Otrzymujemy i wyprowadzamy całą listę kontaktów w postaci tabeli (console.table)
node index.js --action list

# Otrzymujemy kontakt po id
node index.js --action get --id 05olLMgyVQdWRwgKfg5J6

# Dodajemy kontakt
node index.js --action add --name Mango --email mango@gmail.com --phone 322-22-22

# Usuwamy kontakt
node index.js --action remove --id qdggE76Jtbfd9eWJHrssH
```

## Krok 6 - Oddanie pracy domowej

Screenshoty wykonania poleceń można wysłać na dowolną, bezpłatną chmurę zapisywania obrazów (Przykład: [monosnap](https://monosnap.com/), [imgbb.com](https://imgbb.com/)) i odpowiednie odnośniki należy dodać do pliku README.md. Utwórz ten plik w root projektu. Następnie dodaj odnośnik do repozytorium z pracą domową do [schoology](https://app.schoology.com/login) dla sprawdzenia przez mentora.

## Kryteria akceptacji

- Utworzone repozytorium z pracą domową &mdash; CLI aplikacja.
- Zadanie wysłane do mentora na [schoology](https://app.schoology.com/login) w celu sprawdzenia (odnośnik do repozytorium).
- Kod odpowiada technicznemu zadaniu projektu.
- W trakcie wykonywania kodu nie pojawiają się nieopracowane błędy.
- Nazwanie zmiennych, właściwości i metod zaczyna się z małej litery i zapisuje w notacji CamelCase. Wykorzystywane są angielskie rzeczowniki.
- Nazwa funkcji albo metoda zawiera czasownik.
- W kodzie nie ma skomentowanych fragmentów kodu.
- Projekt działa poprawnie w aktualnej wersji LTS Node.
