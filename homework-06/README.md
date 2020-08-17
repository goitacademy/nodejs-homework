**Читать на других языках: [Русский](README.md), [Українська](README.ua.md).**

# Домашнее задание 6

Создай ветку `06-email` из ветки `master`.

Продолжи создание REST API для работы с коллекцией контактов. Добавь верификацию
email'а пользователя после регистрации при помощи
[SendGrid](https://sendgrid.com/).

## Как должно работать в конечном счете

Как пользователь, я должен:

1. При регистрации, получить письмо на указанную при регистрации почту с ссылкой
   для верификации email'а
2. Пройдя по ней в первый раз, я должен получить
   [Ответ со статусом 200](#verification-success-response), что будет
   подразумевать успешную верификацию email'a
3. Пройдя по ней второй, третий раз, я должен получить
   [Ошибку со статусом 404](#verification-user-not-found)

## Шаг 1

### Подготовка интеграции с SendGrid API

- Зарегистрируйся на [SendGrid](https://sendgrid.com/).
- Создай
  [email-отправителя](https://app.gitbook.com/@reloaderlev/s/goit-node-js-new-program/email-rozsilka/sendgrid.-stvorennya-email-vidpravnika)
- [получи API-токен](https://app.gitbook.com/@reloaderlev/s/goit-node-js-new-program/email-rozsilka/sendgrid.-stvorennya-akauntu-i-api-tokena)
- добавь API-токен в `.env` файл

## Шаг 2

### Создание ендпоинта для верификации email'а

- добавить в модель `User` поле `verificationToken`. Присутствие токена в
  документе пользователя будет подразумевать, что его email еще не прошел
  верификацию
- создать ендпоинт GET
  [`/auth/verify/:verificationToken`](#verification-request), где по
  `verificationToken`'y мы будем искать пользователя в модели `User`
- если пользователя с таким токеном нет, вернуть
  [Ошибку NotFound](#verification-user-not-found)
- если есть - удаляем `verificationToken` с документа пользователя и возвращаем
  [Успешный ответ](#verification-success-response)

### Verification request

```shell
GET /auth/verify/:verificationToken
```

### Verification user Not Found

```shell
Status: 404 Not Found
ResponseBody: User not found
```

### Verification success response

```shell
Status: 200 OK
```

## Шаг 3

### Добавление отправки email'а пользователю с ссылкой для верификации

После создания пользователя при регистрации:

- создать `verificationToken` для зарегистрированного пользователя и записать
  его в БД (для генерации токена используйте
  [uuid](https://www.npmjs.com/package/uuid))
- отправить email на почту пользователя и указать ссылку для верификации email'а
  (`/auth/verify/:verificationToken`) в
  [html сообщения](https://app.gitbook.com/@reloaderlev/s/goit-node-js-new-program/email-rozsilka/sendgrid.-vidpravka-email-iv-cherez-paket-sendgrid-mail)

## Шаг 4

### Проверка правильности работы

[Условия, указанные в начале задания](#как-должно-работать-в-конечном-счете),
должны работать
