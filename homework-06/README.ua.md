**Читать на других языках: [Русский](README.md), [Українська](README.ua.md).**

# Домашнє завдання 6

Створи гілку `06-email` з гілки `master`.

Продовж створення REST API для роботи з колекцією контактів. Додай верифікацію
email'а користувача після реєстрації за допомогою
[SendGrid](https://sendgrid.com/).

## Як має працювати в кінцевому результаті

Як користувач, я повинен:

1. При реєстрації, отримати лист на вказану при реєстрації пошту з посиланням
   для верифікації email'а
2. Пройшовши по ній в перший раз, я повинен отримати
   [Відповідь зі статусом 200](#verification-success-response), що буде мати на
   увазі успішну верифікацію email'a
3. Пройшовши по ній другий, третій раз, я повинен отримати
   [Помилку зі статусом 404](#verification-user-not-found)

## Крок 1

### Підготовка інтеграції з SendGrid API

- Зареєструйся на [SendGrid](https://sendgrid.com/).
- Створи
  [email-відправника](https://app.gitbook.com/@reloaderlev/s/goit-node-js-new-program/email-rozsilka/sendgrid.-stvorennya-email-vidpravnika)
- [отримай API-токен](https://app.gitbook.com/@reloaderlev/s/goit-node-js-new-program/email-rozsilka/sendgrid.-stvorennya-akauntu-i-api-tokena)
- додай API-токен в `.env` файл

## Крок 2

### Створення ендпоінта для верифікації email'а

- додати в модель `User` поле `verificationToken`. Присутність токена в
  документі користувача буде мати на увазі, що його email ще не пройшов
  верифікацію
- створити ендпоінт GET
  [`/auth/verify/:verificationToken`](#verification-request), де по
  `verificationToken`'y ми будемо шукати користувача в моделі `User`
- якщо користувача з таким токеном немає, повернути
  [Помилку NotFound](#verification-user-not-found)
- якщо є - видаляємо `verificationToken` з документа користувача і повертаємо
  [Успішну відповідь](#verification-success-response)

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

## Крок 3

### Додавання відправки email'а користувачеві з посиланням для верифікації

Після створення користувача при реєстрації:

- створити `verificationToken` для зареєстрованого користувача і записати його в
  БД (для генерації токена використовуйте
  [uuid](https://www.npmjs.com/package/uuid))
- відправити email на пошту користувача і вказати посилання для верифікації
  email'а (`/auth/verify/:verificationToken`) в
  [html повідомлення](https://app.gitbook.com/@reloaderlev/s/goit-node-js-new-program/email-rozsilka/sendgrid.-vidpravka-email-iv-cherez-paket-sendgrid-mail)

## Крок 4

### Перевірка правильності роботи

[Умови, зазначені на початку завдання](#як-має-працювати-в-кінцевому-результаті),
повинні працювати
