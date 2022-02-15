**Czytaj w innych językach: [rosyjski](README.md), [ukraiński](README.ua.md).**

# Zadanie domowe 5

Utwórz gałąź `hw05-avatars` z gałęzi `master`.

Kontynuuj tworzenie REST API do pracy ze zbiorem kontaktów. Dodaj opcję ładowania awataru użytkownika przez [Multer](https://github.com/expressjs/multer).

## Krok 1

Stwórz folder `public` do rozdawania statyki. W tym folderze utwórz folder `avatars`. Narzędzie Express do rozdawania plików statycznych z folderu `public`.

Umieść dowolny obraz w folderze `public/avatars` i sprawdź, czy rozdawanie statyki działa. Po przejściu po takim URL przeglądarka wyświetli obraz.

```shell
http://localhost:<порт>/avatars/<имя файла с расширением>
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

# Неуспешный ответ Błędna odpowiedź
Status: 401 Unauthorized
Content-Type: application/json
ResponseBody: {
  "message": "Not authorized"
}
```

- Создай папку tmp в корне проекта и сохраняй в неё загруженную аватарку.
Utwórz folder tmp w root projketu i zapisują w niej załadowany awatar.
- Обработай аватарку пакетом [jimp](https://www.npmjs.com/package/jimp) и задай для нее размеры 250 на 250
Opracuj awatar przy pomocy pakietu [jimp](https://www.npmjs.com/package/jimp) i wprowadź dla niego wymiary 250 na 250.
- Перенеси аватарку пользователя из папки tmp в папку `public/avatars` и дай ей уникальное имя для конкретного пользователя.
Przenieś awatar uzytkownika z folderu tmp do folderu `public/avatars` i nadaj mu unikalną nazwę dla konkretnego użytkownika.
- Полученный `URL` `/avatars/<имя файла с расширением>` сохрани в поле `avatarURL` пользователя
Otrzymany `URL` `/avatars/<nazwa pliku z rozszerzeniem>` zapisz w polu `avatarURL` użytkownika.

## Дополнительное задание - необязательное Zadanie dodatkowe – nieobowiązkowe

### 1. Написать unit-тесты для контроллера входа (login/signin) Napisać unit-testy dla kontrolera wejścia (login/signin)

При помощи Przy pomocy [Jest](https://jestjs.io/ru/docs/getting-started)

- ответ должен иметь статус-код 200
odpowiedź powinna mieć status kod 200;
- в ответе должен возвращаться токен
w odpowiedzi powinien być zwracany token;
- в ответе должен возвращаться объект `user` с 2 полями `email` и `subscription`, имеющие тип данных `String`
w odpowiedzi powinien być zwracany obiekt  `user` z 2 polami `email` i `subscription`, mającymi typ danych `String`.

