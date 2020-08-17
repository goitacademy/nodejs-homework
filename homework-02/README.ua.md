**Читать на других языках: [Русский](README.md), [Українська](README.ua.md).**

# Домашнє завдання 2

Створи гілку `02-express` з гілки `master`.

Написать REST API для работы с коллекцией контактов. Для работы с REST API
используй [Postman](https://www.getpostman.com/).

## Крок 1

Добавь в проект пакеты [express](https://www.npmjs.com/package/express),
[morgan](https://www.npmjs.com/package/morgan) и
[cors](https://www.npmjs.com/package/cors).

## Крок 2

У index.js веб сервер на express і додаємо прошарку morgan і cors. налаштовуй
раутінг для роботи з колекцією контактів.

REST API повинен підтримувати такі раути.

### @ GET /api/contacts

- нічого не отримує
- викликає функцію `listContacts` для роботи з json-файлом contacts.json
- повертає масив всіх контактів в json-форматі зі статусом 200

### @ GET /api/contacts/:contactId

- Не отримує body
- Отримує параметр `contactId`
- викликає функцію getById для роботи з json-файлом contacts.json
- якщо такий id є, повертає об'єкт контакту в json-форматі зі статусом 200
- якщо такого id немає, повертає json з ключем `"message": "Not found"` і
  статусом 404

### @ POST /api/contacts

- Отримує body в форматі `{name, email, phone}`
- Якщо в body немає якихось обов'язкових полів, повертає json з ключем
  `{"message": "missing required name field"}` і статусом 400
- Якщо з body все добре, додає унікальний ідентифікатор в об'єкт контакту
- Викликає функцію `addContact()` для збереження контакту в файлі contacts.json
- За результатом роботи функції повертає об'єкт з доданим id
  `{id, name, email, phone}` і статусом 201

### @ DELETE /api/contacts/:contactId

- Не отримує body
- Отримує параметр `contactId`
- Викликає функцію `removeContact` для роботи з json-файлом contacts.json
- якщо такий id є, повертає json формату `{"message": "contact deleted"}` і
  статусом 200
- якщо такого id немає, повертає json з ключем `"message": "Not found"` і
  статусом 404

### @ PATCH /api/contacts/:contactId

- Отримує body в json-форматі c оновленням будь-яких полів `name, email и phone`
- Якщо body немає, повертає json з ключем `{"message": "missing fields"}` і
  статусом 400
- Якщо з body всі добре, викликає функцію `updateContact(id)` (Напиши її) для
  поновлення контакту в файлі contacts.json
- За результатом роботи функції повертає оновлений об'єкт контакту і
  статусом 200. В іншому випадку, повертає json з ключем
  `"message": "Not found"` і статусом 404
