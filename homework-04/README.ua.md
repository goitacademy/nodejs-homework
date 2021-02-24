**Читать на других языках: [Русский](README.md), [Українська](README.ua.md).**

# Домашнє завдання 4

Створи гілку `04-auth` з гілки `master`.

Продовж створення REST API для роботи з колекцією контактів. Додай логіку
аутентифікації / авторизації користувача через [JWT](https://jwt.io/).

## Крок 1

У коді створи схему і модель користувача для колекції `users`.

```js
{
  email: String,
  password: String,
  subscription: {
    type: String,
    enum: ["free", "pro", "premium"],
    default: "free"
  },
  token: String
}
```

Змініть схему контактів, щоб кожен користувач бачив тільки свої контакти. Для
цього в схемі контактів додайте властивість

```js
    owner: {
      type: SchemaTypes.ObjectId,
      ref: 'user',
    }
```

## Крок 2

### Регістрація

Створити ендпоінт [`/auth/register`](#registration-request)

Зробити валідацію всіх обов'язкових полів (email і password). при помилку
валідації повернути [Помилку валідації](#registration-validation-error).

У разі успішної валідації в моделі `User` створити користувача за даними які
пройшли валідацію. Для засолювання паролів використовуй
[bcrypt](https://www.npmjs.com/package/bcrypt)

- Якщо пошта вже використовується кимось іншим, повернути
  [Помилку Conflict](#registration-conflict-error).
- В іншому випадку повернути
  [успішна відповідь](#registration-success-response).

#### Registration request

```shell
POST /auth/register
Content-Type: application/json
RequestBody: {
  "email": "example@example.com",
  "password": "examplepassword"
}
```

#### Registration validation error

```shell
Status: 400 Bad Request
Content-Type: application/json
ResponseBody: <Ошибка от Joi или другой валидационной библиотеки>
```

#### Registration conflict error

```shell
Status: 409 Conflict
Content-Type: application/json
ResponseBody: {
  "message": "Email in use"
}
```

#### Registration success response

```shell
Status: 201 Created
Content-Type: application/json
ResponseBody: {
  "user": {
    "email": "example@example.com",
    "subscription": "free"
  }
}
```

### Логін

Створити ендпоінт [`/auth/login`](#login-request)

В моделі `User` знайти користувача за `email`.

Зробити валідацію всіх обов'язкових полів (email і password). При помилці
валідації повернути [Помилку валідації](#validation-error-login).

- В іншому випадку, порівняти пароль для знайденого користувача, якщо паролі
  збігаються створити токен, зберегти в поточному юзера і повернути
  [Успешный ответ](#login-success-response).
- Якщо пароль або імейл невірний, повернути
  [Помилку Unauthorized](#login-auth-error).

#### Login request

```shell
POST /auth/login
Content-Type: application/json
RequestBody: {
  "email": "example@example.com",
  "password": "examplepassword"
}
```

#### Login validation error

```shell
Status: 400 Bad Request
Content-Type: application/json
ResponseBody: <Ошибка от Joi или другой валидационной библиотеки>
```

#### Login success response

```shell
Status: 200 OK
Content-Type: application/json
ResponseBody: {
  "token": "exampletoken",
  "user": {
    "email": "example@example.com",
    "subscription": "free"
  }
}
```

#### Login auth error

```shell
Status: 401 Unauthorized
ResponseBody: Email or password is wrong
```

## Крок 3

### Перевірка токена

Створи мідлвар для перевірки токена і додай його до всіх раутам які повинні бути
захищені.

- Мідлвар бере токен з заголовків `Authorization`, перевіряє токен на
  валідність.
- У випадку помилки повернути
  [Помилку Unauthorized](#middleware-unauthorized-error).
- Якщо валідація пройшла успішно, отримати з токена id користувача. Знайти
  користувача в базі даних з цього id. Якщо користувач існує, записати його дані
  в `req.user` і викликати `next()`. Якщо користувача з таким id НЕ существет,
  повернути [Помилку Unauthorized](#middleware-unauthorized-error)

#### Middleware unauthorized error

```shell
Status: 401 Unauthorized
Content-Type: application/json
ResponseBody: {
  "message": "Not authorized"
}
```

## Крок 4

### Логаут

Створити ендпоінт [`/auth/logout`](#logout-request)

Додай в раут мідлвар перевірки токена.

- У моделі `User` знайти користувача за `_id`.
- Якщо користувача не повернути
  [Помилку Unauthorized](#logout-unauthorized-error).
- В іншому випадку, видалити токен в поточному юзера і повернути
  [успішна відповідь](#logout-success-response).

#### Logout request

```shell
POST /auth/logout
Authorization: "Bearer token"
```

#### Logout unauthorized error

```shell
Status: 401 Unauthorized
Content-Type: application/json
ResponseBody: {
  "message": "Not authorized"
}
```

#### Logout success response

```shell
Status: 204 No Content
```

### Поточний - отримати дані юзера по токені

Створити ендпоінт [`/users/current`](#current-user-request)

Додай в раут мідлвар перевірки токена.

- Якщо користувача не повернути
  [Помилку Unauthorized](#current-user-unauthorized-error)
- В іншому випадку повернути [Успішну відповідь](#current-user-success-response)

#### Current user request

```shell
GET /users/current
Authorization: "Bearer token"
```

#### Current user unauthorized error

```shell
Status: 401 Unauthorized
Content-Type: application/json
ResponseBody: {
  "message": "Not authorized"
}
```

#### Current user success response

```shell
Status: 200 OK
Content-Type: application/json
ResponseBody: {
  "email": "example@example.com",
  "subscription": "free"
}
```

## Додаткове завдання - необов'язкове

- Зробити пагінацію з
  [mongoose-paginate-v2](https://www.npmjs.com/package/mongoose-paginate-v2) для
  колекції контактів (GET / contacts? page = 1 & limit = 20).
- Зробити фільтрацію контактів по типу підписки (GET / contacts? Sub = free)
- Оновлення підписки (`subscription`) користувача через ендпоінт PATCH / users.
  Підписка повинна мати одне з наступних значень `['free', 'pro', 'premium']`
