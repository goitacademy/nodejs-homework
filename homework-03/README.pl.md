**Czytaj w innych językach: [rosyjski](README.md), [ukraiński](README.ua.md).**

# Zadanie domowe 3

Utwórz gałąź `hw03-mongodb` z gałęzi `master`.

Kontynuuj tworzenie REST API do pracy ze zbiorem kontaktów.

## Krok 1

Stwórz konto na [MongoDB Atlas](https://www.mongodb.com/cloud/atlas), a następnie na koncie utwórz nowy projekt i skonfiguruj **bezpłatny klaster**. W czasie konfigurowania klastera wybierz provider i region, jak na screenshocie poniżej. Jeżeli wybierzesz zbyt oddalony region, serwer odpowie wolniej.

![atlas cluster setup](./atlas-cluster.jpg)

## Krok 2

Skonfiguruj edytor graficzny [MongoDB Compass](https://www.mongodb.com/products/compass) do wygodnej pracy z bazą danych dla MongoDB. Skonfiguruj podłączenie swojej chmury do Compass. W MongoDB Atlas nie zapomnij utworzyć użytkownika z prawami administratora.

## Krok 3

Przez Compass utwórz bazę danych `db-contacts`, a w niej zbiór `contacts`. Weź [odnośnik do json](./contacts.json) i przy pomocy Compass wypełnij zbiór `contacts` (zaimportuj) jego zawartością.

![data](./json-data.png)

Jeżeli wszystko zrobiłeś prawidłowo, dane powinny się pojawić w twojej bazie w zbiorze `contacts`

![data](./mongo-data.png).

## Krok 4

Wykorzystaj kod źródłowy [zadania domowego #2](../homework-02/README.md) i zamień zapisywanie kontaktów z pliku json na utworzoną przez siebie bazę danych.

- Napisz kod do utworzenia podłączenia do MongoDB przy pomocy [Mongoose](https://mongoosejs.com/).
- Przy sukcesie podłączenia wyprowadź na konsolę wiadomość `"Database connection successful"`.
- Obowiązkowo opracuj błąd podłączenia. Wyprowadź na konsolę wiadomość o błędzie i zakończ proces, wykorzystując `process.exit(1)`.
- W funkcjach opracowywania zapytań zamień kod operacji CRUD na kontaktach z pliku, na metody Mongoose do pracy ze zbiorem kontaktów w bazie danych.

Schemat modeli dla zbioru `contacts`:

```js
  {
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  }
```

## Krok 5

W naszych kontaktach pojawiło się dodatkowe pole statusu `favorite`, które przyjmuje logiczną wartość `true` lub `false`. Odpowiada ono za to, że wskazany kontakt znajduje się lub nie w ulubionych. Zrealizuj dla aktualizacji statusu kontaktu nową trasę.

### @ PATCH /api/contacts/:id/favorite

- Otrzymuje parametr `contactId`.
- Otrzymuje `body` w formacie json z aktualizacją pola `favorite`.
- Jeżeli `body` nie ma, zwraca json z kluczem `{"message": "missing field favorite"}` i statusem `400`.
- Jeżeli w `body` wszystko się zgadza to wywołaj funkcję `updateStatusContact(contactId, body)` (napisz ją), aby zaktualizować kontakt w bazie danych
- W wyniku pracy funkcji zwraca zaktualizowany obiekt kontaktu ze statusem `200`. W przeciwnym razie zwraca json z kluczem `"message": "Not found"` i statusem `404`.


Dla routa `POST /api/contacts` wprowadź zmiany: jeśli pole `favorite` nie zostało wskazane w `body`, to przy zapisaniu w bazie nowego kontaktu ustaw pole `favorite` domyślnie w `false`. Nie zapominajmy o walidacji danych!
