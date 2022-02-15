**Czytaj w innych językach: [rosyjski](README.md), [ukraiński](README.ua.md).**

# Домашнее задание 5 Zadanie domowe 5

Создай ветку `hw05-avatars` из ветки `master`.
Utwórz gałąź `hw05-avatars` z gałęzi `master`.

Продолжи создание REST API для работы с коллекцией контактов. Добавь возможность загрузки аватарки пользователя через [Multer](https://github.com/expressjs/multer).

Kontynuuj tworzenie REST API do pracy ze zbiorem kontaktów. Dodaj opcję ładowania awataru użytkownika przez [Multer](https://github.com/expressjs/multer).

## Шаг 1 Krok 1

Создай папку `public` для раздачи статики. В этой папке сделай папку `avatars`. Настрой Express на раздачу статических файлов из папки `public`.

Stwórz folder `public` do rozdawania statyki. W tym folderze utwórz folder `avatars`. Narzędzie Express do rozdawania plików statycznych z folderu `public`.

Положи любое изображение в папку `public/avatars` и проверь что раздача статики работает. При переходе по такому URL браузер отобразит изображение.
Umieść dowolny obraz w folderze `public/avatars` i sprawdź, czy rozdawanie statyki działa. Po przejściu po takim URL przeglądarka wyświetli obraz.

```shell
http://localhost:<порт>/avatars/<имя файла с расширением>
```

## Шаг 2 Krok 2

В схему пользователя добавь новое свойство `avatarURL` для хранения изображения.
Do schematu użytkownika dodaj nową właściwość `avatarURL` dla przechowywania obrazu.

```shell
{
  ...
  avatarURL: String,
  ...
}
```

- Используй пакет [gravatar](https://www.npmjs.com/package/gravatar) для того чтобы при регистрации нового пользователя сразу сгенерить ему аватар по его `email`.
Wykorzystaj pakiet [gravatar](https://www.npmjs.com/package/gravatar), aby przy rejestracji nowego użytkownika od razu wygenerować mu awatar po jego `email`.

## Шаг 3 Krok 3

При регистрации пользователя: Przy rejestracji użytkownika:

- Создавай ссылку на аватарку пользователя с помощью [gravatar](https://www.npmjs.com/package/gravatar)
Utwórz odnośnik do awatara użytkownika przy pomocy [gravatar](https://www.npmjs.com/package/gravatar).
- Полученный URL сохрани в поле `avatarURL` во время создания пользователя
Otrzymany URL zapisz w polu `avatarURL` w czasie tworzenia użytkownika.

## Шаг 4 Krok 4

Добавь возможность обновления аватарки, создав эндпоинт `/users/avatars` и используя метод `PATCH`.
Dodaj możliwość aktualizacji awatara, tworząć endpoint `/users/avatars` i wykorzystując metodę `PATCH`.

![avatar upload from postman](./avatar-upload.png)

```shell
# Запрос Zapytanie
PATCH /users/avatars
Content-Type: multipart/form-data
Authorization: "Bearer {{token}}"
RequestBody: загруженный файл załadowany plik

# Успешный ответ Pomyślna odpowiedź
Status: 200 OK
Content-Type: application/json
ResponseBody: {
  "avatarURL": "тут будет ссылка на изображение" tu będzie odnośnik do obrazu
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

