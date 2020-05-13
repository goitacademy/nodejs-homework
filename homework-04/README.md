# Домашнее задание 4

Создай ветку `04-auth` из ветки `master`.

Продолжи создание REST API для работы с коллекцией контактов. Добавь логику
аутентификации/авторизации пользователя через [JWT](https://jwt.io/).

## Шаг 1

В коде создай схему и модель пользователя для коллекции `users`.

```shell
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

## Шаг 2

### Регистрация

Создать ендпоинт [`/auth/register`](#register-request)

Сделать валидацию всех обязательных полей (email и password). При ошибке
валидации вернуть [Ошибку валидации](#validation-error).

В случае успешной валидации в модели `User` создать пользователя по данным
которые прошли валидацию. Для засолки паролей используй
[bcrypt](https://www.npmjs.com/package/bcrypt)

- Если почта уже используется кем-то другим, вернуть [Ошибку Conflict](#register-conflict-error).
- В противном случае вернуть [Успешный ответ](#register-success-response).

#### register-request

```shell
POST /auth/register
Content-Type: application/json
RequestBody: {
  "email": "example@example.com",
  "password": "examplepassword"
}
```

#### validation-error

```shell
Status: 400 Bad Request
Content-Type: application/json
ResponseBody: <Ошибка от Joi или другой валидационной библиотеки>
```

#### register-conflict-error

```shell
Status: 409 Conflict
Content-Type: application/json
ResponseBody: {
  "message": "Email in use"
}
```

#### register-success-response

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

### Логин

Создать ендпоинт [`/auth/login`](#login-request)

В модели `User` найти пользователя по `email`.

Сделать валидацию всех обязательных полей (email и password). При ошибке
валидации вернуть [Ошибку валидации](#validation-error).

- В противном случае, сравнить пароль для найденного юзера, если пароли
  совпадают создать токен, сохранить в текущем юзере и вернуть [Успешный ответ](#login-success-response).
- Если пароль или имейл неверный, вернуть [Ошибку Unauthorized](#login-auth-error).

#### login-request

```shell
POST /auth/login
Content-Type: application/json
RequestBody: {
  "email": "example@example.com",
  "password": "examplepassword"
}
```

#### login-success-response

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

#### login-auth-error
```shell
Status: 401 Unauthorized
ResponseBody: Email or password is wrong
```

## Шаг 3

### Проверка токена

Создай мидлвар для проверки токена и добавь его ко всем раутам которые должны
быть защищены.

- Мидлвар берет токен из заголовков `Authorization`, проверяет токен на
  валидность.
- В случае ошибки вернуть [Ошибку Unauthorized](#middleware-unauthorized-error).
- Если валидация прошла успешно, получить из токена id пользователя. Найти
  пользователя в базе данных по этому id. Если пользователь существует, записать
  его данные в `req.user` и вызвать `next()`. Если пользователя с таким id не
  существет, вернуть [Ошибку Unauthorized](#middleware-unauthorized-error)

#### middleware-unauthorized-error

```shell
Status: 401 Unauthorized
Content-Type: application/json
ResponseBody: {
  "message": "Not authorized"
}
```

## Шаг 4

### Логаут

Создать ендпоинт [`/auth/logout`](#logout-request)

Добавь в раут мидлвар проверки токена.

- В модели `User` найти пользователя по `_id`.
- Если пользователя не сущестует вернуть [Ошибку Unauthorized](#middleware-unauthorized-error).
- В противном случае, удалить токен в текущем юзере и вернуть
  [Успешный ответ](#logout-success-response).

#### logout-request

```shell
POST /auth/logout
Authorization: "Bearer token"
```

#### logout-success-response

```shell
Status: 204 No Content
```

### Текущий - получить данные юзера по токену

Создать ендпоинт [`/users/current`](#current-request)

Добавь в раут мидлвар проверки токена.

- Если пользователя не сущестует вернуть [Ошибку Unauthorized](#middleware-unauthorized-error)
- В противном случае вернуть [Успешный ответ](#current-success-response)

#### current-request

```shell
GET /users/current
Authorization: "Bearer token"
```

#### current-success-response

```shell
Status: 200 OK
Content-Type: application/json
ResponseBody: {
  "email": "example@example.com",
  "subscription": "free"
}
```

## Дополнительное задание - необязательное

- Сделать пагинацию с
  [mongoose-paginate-v2](https://www.npmjs.com/package/mongoose-paginate-v2) для
  коллекции контактов (GET /contacts?page=1&limit=20).
- Сделать фильтрацию контактов по типу подписки (GET /contacts?sub=free)
- Обновление подписки (`subscription`) пользователя через ендпоинт PATCH /users. Подписка должна иметь одно из следующих значений `['free', 'pro', 'premium']`
