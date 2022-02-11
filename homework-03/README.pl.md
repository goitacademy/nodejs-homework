**Czytaj w innych językach: [rosyjski](README.md), [ukraiński](README.ua.md).**

# Домашнее задание 3 Zadanie domowe 3

Создай ветку `hw03-mongodb` из ветки `master`.
Utwórz gałąź `hw03-mongodb` z gałęzi `master`.

Продолжи создание REST API для работы с коллекцией контактов.
Kontynuuj tworzenie REST API do pracy ze zbiorem kontaktów.

## Шаг 1 Krok 1

Создай аккаунт на [MongoDB Atlas](https://www.mongodb.com/cloud/atlas). После чего в аккаунте создай новый проект и настрой **бесплатный кластер**. Во время настройки кластера выбери провайдера и регион как на скриншоте ниже. Если выбрать слишком удаленный регион, скорость ответа сервера будет дольше.

Stwórz konto na [MongoDB Atlas](https://www.mongodb.com/cloud/atlas), a następnie na koncie utwórz nowy projekt i skonfiguruj **bezpłatny klaster**. W czasie konfigurowania klasteru wybierz provider i region, jak na screenshocie poniżej. Jeżeli wybierzez zbyt oddalony region, serwer odpowie wolniej.

![atlas cluster setup](./atlas-cluster.jpg)

## Шаг 2 Krok 2

Установи графический редактор [MongoDB Compass](https://www.mongodb.com/download-center/compass) c для удобной работы с базой данных для MongoDB. Настрой подключение своей облачной базы данных к Compass. В MongoDB Atlas не забудь создать пользователя с правами администратора.

Skonfiguruj edytor graficzny [MongoDB Compass](https://www.mongodb.com/download-center/compass) dla wygodnej pracy z bazą danych dla MongoDB. Skonfiguruj podłączenie swojej chmury do Compass. W MongoDB Atlas nie zapomnij utworzyć użytkownika z prawami administratora.

## Шаг 3 Krok 3

Через Compass создай базу данных `db-contacts` и в ней коллекцию `contacts`. Возьми [ссылка на json](./contacts.json) и при помощи Compass наполни коллекцию `contacts` (сделай импорт) его содержимым.

Przez Compass utwórz bazę danych `db-contacts`, a w niej zbiór `contacts`. Weź [odnośnik do json](./contacts.json) i przy pomocy Compass wypełnij zbiór `contacts` (zaimportuj) jego zawartością.

![data](./json-data.png)

Если вы все сделали правильно, данные должны появиться в вашей базе в коллекции `contacts`

Jeżeli wszystko zrobiłeś prawidłowo, dane powinny się pojawić w twojej bazie w zbiorze `contacts`

![data](./mongo-data.png)

## Шаг 4 Krok 4

Используйте исходный код [домашней работы #2](../homework-02/README.md) и замените хранение контактов из json-файла на созданную вами базу данных.
Wykorzystaj kod źródłowy [zadania domowego #2](../homework-02/README.md) i zamień zapisywanie kontaktów z pliku json na utworzoną przez was bazę danych.

- Напишите код для создания подключения к MongoDB при помощи [Mongoose](https://mongoosejs.com/).
- Napisz kod do utworzenia podłączenia do MongoDB przy pomocy [Mongoose](https://mongoosejs.com/).
- При успешном подключении выведите в консоль сообщение `"Database connection successful"`.
- Przy sukcesie podłączenia wyprowadź na konsol wiadomość `"Database connection successful"`.
- Обязательно обработайте ошибку подключения. Выведите в консоль сообщение ошибки и завершите процесс используя `process.exit(1)`.
- Obowiązkowo opracuj błąd podłączenia. Wyprowadź na konsolę wiadomość o błędzie i zakończ proces, wykorzystując `process.exit(1)`.
- В функциях обработки запросов замените код CRUD-операций над контактами из файла, на Mongoose-методы для работы с коллекцией контактов в базе данных.
- W funkcjach opracowywania zapytań zamień kod operacji CRUD na kontaktach z pliku, na metody Mongoose do pracy ze zbiorem kontaktów w bazie danych.

Схема модели для коллекции `contacts`:
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

## Шаг 5 Krok 5

У нас появилось в контактах дополнительное поле статуса `favorite`, которое принимает логическое значение `true` или `false`. Оно отвечает за то, что в избранном или нет находится указанный контакт. Реализуй для обновления статуса контакта новый маршрут

W naszych kontaktach pojawiło się dodatkowe pole statusu `favorite`, które przyjmuje logiczną wartość `true` lub `false`. Odpowiada ono za to, że w ulubionych lub nie, znajduje się wskazany kontakt. Zrealizuj dla aktuaizacji statusu kontaktu nową trasę.

### @ PATCH /api/contacts/:contactId/favorite

- Получает параметр `contactId`
- Otrzymuje paramter `contactId`.
- Получает `body` в json-формате c обновлением поля `favorite`
- Otrzymuje `body` w formacie json z aktualizacją pola `favorite`.
- Если `body` нет, возвращает json с ключом `{"message": "missing field favorite"}` и статусом `400`
- Jeżeli `body` nie ma, zwraca json z kluczem `{"message": "missing field favorite"}` i statusem `400`.
- Если с `body` все хорошо, вызывает функцию `updateStatusContact(contactId, body)` (напиши ее) для обновления контакта в базе
- По результату работы функции возвращает обновленный объект контакта и статусом `200`. В противном случае, возвращает json с ключом `"message": "Not found"` и статусом `404`
- W wyniku pracy funkcji zwraca zaktualizowany obiekt kontaktu ze statusem `200`. W przciwnym razie zwraca json z kluczem `"message": "Not found"` i statusem `404`.


Для роута `POST /api/contacts` внесите изменения: если поле `favorite` не указали в `body`, то при сохранении в базу нового контакта, сделайте поле `favorite` равным по умолчанию `false`. Не забываем про валидацию данных!
