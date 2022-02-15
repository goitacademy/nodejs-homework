**Czytaj w innych językach: [rosyjski](README.md), [ukraiński](README.ua.md).**

# Zadanie domowe 5

Utwórz gałąź `hw05-avatars` z gałęzi `master`.

Kontynuuj tworzenie REST API do pracy ze zbiorem kontaktów. Dodaj opcję ładowania awataru użytkownika przez [Multer](https://github.com/expressjs/multer).

## Krok 1

Stwórz folder `public` do rozdawania statyki. W tym folderze utwórz folder `avatars`. Narzędzie Express do rozdawania plików statycznych z folderu `public`.

Umieść dowolny obraz w folderze `public/avatars` i sprawdź, czy rozdawanie statyki działa. Po przejściu po takim URL przeglądarka wyświetli obraz.

```shell
http://localhost:<порт>/avatars/<nazwa pliku z rozszerzeniem> 
```

## Krok 2

Do schematu użytkownika dodaj nową właściwość `avatarURL` dla przechowywania obrazu.

```shell
{
  ...
  avatarURL: String,
  ...
}
```

Wykorzystaj pakiet [gravatar](https://www.npmjs.com/package/gravatar), aby przy rejestracji nowego użytkownika od razu wygenerować mu awatar po jego `email`.

## Krok 3

Przy rejestracji użytkownika:

- Utwórz odnośnik do awatara użytkownika przy pomocy [gravatar](https://www.npmjs.com/package/gravatar).
- Otrzymany URL zapisz w polu `avatarURL` w czasie tworzenia użytkownika.

## Krok 4

Dodaj możliwość aktualizacji awatara, tworząc endpoint `/users/avatars` i wykorzystując metodę `PATCH`.

![avatar upload from postman](./avatar-upload.png)

```shell
# Zapytanie
PATCH /users/avatars
Content-Type: multipart/form-data
Authorization: "Bearer {{token}}"
RequestBody: załadowany plik

# Pomyślna odpowiedź
Status: 200 OK
Content-Type: application/json
ResponseBody: {
  "avatarURL": "tu będzie odnośnik do obrazu" 
}

# Błędna odpowiedź
Status: 401 Unauthorized
Content-Type: application/json
ResponseBody: {
  "message": "Not authorized"
}
```

- Utwórz folder tmp w root projektu i zapisuj w nim załadowany awatar.
- Opracuj awatar przy pomocy pakietu [jimp](https://www.npmjs.com/package/jimp) i wprowadź dla niego wymiary 250 na 250.
- Przenieś awatar użytkownika z folderu tmp do folderu `public/avatars` i nadaj mu unikalną nazwę dla konkretnego użytkownika.
- Otrzymany `URL` `/avatars/<nazwa pliku z rozszerzeniem>` zapisz w polu `avatarURL` użytkownika.

## Zadanie dodatkowe – nieobowiązkowe

### 1. Napisać unit-testy dla kontrolera wejścia (login/signin)

Przy pomocy [Jest](https://jestjs.io/ru/docs/getting-started)

- odpowiedź powinna mieć status kod 200;
- w odpowiedzi powinien być zwracany token;
- w odpowiedzi powinien być zwracany obiekt `user` z 2 polami `email` i `subscription`, mającymi typ danych `String`.

