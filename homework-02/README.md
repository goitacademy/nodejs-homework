**Читать на других языках: [Русский](README.md), [Українська](README.ua.md).**

# Домашнее задание 2

Создай форк
[репозитория](https://github.com/goitacademy/nodejs-homework-template) в свой
github аккаунт.

Посмотри поясняющее видео как это сделать и сдавать ДЗ правильно:
[![Title](./js.png)](https://www.youtube.com/watch?v=wabSW_sz_cM 'Пояснение')

Написать REST API для работы с коллекцией контактов. Для работы с REST API используй [Postman](https://www.getpostman.com/).

Прочитай внимательно readme в клонированном бойлерплейте, там описан механизм сдачи домашних заданий. Приступай к выполнению ДЗ

## Шаг 1

Создай ветку 02-express из ветки master.

Установи модули командой:

```bash
npm i
```

Следующие модули уже есть в проекте:
- [express](https://www.npmjs.com/package/express)
- [morgan](https://www.npmjs.com/package/morgan)
- [cors](https://www.npmjs.com/package/cors)

## Шаг 2

В app.js – веб сервер на express, добавлены прослойки `morgan` и `cors`. Начни настраивать раутинг для работы с коллекцией контактов.

REST API должен поддерживать следующие рауты.

### @ GET /api/contacts

- ничего не получает
- вызывает функцию `listContacts` для работы с json-файлом `contacts.json`
- возвращает массив всех контактов в json-формате со статусом `200`

### @ GET /api/contacts/:contactId

- Не получает `body`
- Получает параметр `contactId`
- вызывает функцию getById для работы с json-файлом contacts.json
- если такой id есть, возвращает обьект контакта в json-формате со статусом `200`
- если такого id нет, возвращает json с ключом `"message": "Not found"` и статусом `404`

### @ POST /api/contacts

- Получает `body` в формате `{name, email, phone}`
- Если в body нет каких-то обязательных полей, возвращает json с ключом `{"message": "missing required name field"}` и статусом `400`
- Если с `body` все хорошо, добавляет уникальный идентификатор в объект контакта
- Вызывает функцию `addContact(body)` для сохранения контакта в файле `contacts.json`
- По результату работы функции возвращает объект с добавленным `id` `{id, name, email, phone}` и статусом `201`

### @ DELETE /api/contacts/:contactId

- Не получает `body`
- Получает параметр `contactId`
- вызывает функцию `removeContact` для работы с json-файлом `contacts.json`
- если такой `id` есть, возвращает json формата `{"message": "contact deleted"}` и статусом `200`
- если такого `id` нет, возвращает json с ключом `"message": "Not found"` и статусом `404`

### @ PATCH /api/contacts/:contactId

- Получает параметр `contactId`
- Получает `body` в json-формате c обновлением любых полей `name, email и phone`
- Если `body` нет, возвращает json с ключом `{"message": "missing fields"}` и статусом `400`
- Если с `body` все хорошо, вызывает функцию `updateContact(contactId, body)` (напиши ее) для обновления контакта в файле `contacts.json`
- По результату работы функции возвращает обновленный объект контакта и статусом `200`. В противном случае, возвращает json с ключом `"message": "Not found"` и статусом `404`
