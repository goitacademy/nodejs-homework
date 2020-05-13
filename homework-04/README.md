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
валидации вернуть [#register-fields-error-response](#register-fields-error-response).

В случае успешной валидации в модели `User` создать пользователя по данным
которые прошли валидацию. Для засолки паролей используй
[bcrypt](https://www.npmjs.com/package/bcrypt)

- Если почта уже используется кемто другим, вернуть [#register-email-error-response](#register-email-error-response).
- В противном случае вернуть [#register-success-response](#register-success-response).

#### register-request

```shell
POST /auth/register
Content-Type: application/json
RequestBody: {
  "email": "example@example.com",
  "password": "examplepassword"
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

#### register-fields-error-response

```shell
Status: 422 BAD
Content-Type: application/json
ResponseBody: {
  "message": "Missing required fields"
}
```

#### register-email-error-response

```shell
Status: 400 BAD
Content-Type: application/json
ResponseBody: {
  "message": "Email in use"
}
```

### Логин

Создать ендпоинт [`/auth/login`](#login-request)

В модели `User` найти пользователя по `email`.

- Если пользователя не сущестует вернуть # Неуспешный ответ.
- В противном случае, сравнить пароль для найденного юзера, если пароли
  совпадают создать токен, сохранить в текущем юзере и вернуть [#login-success-response](#login-success-response).
- Если пароль не верный, вернуть [#login-error-response](#login-error-response).

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

#### login-error-response

```shell
Status: 400 BAD
Content-Type: application/json
ResponseBody: {
  "message": "Неверный логин или пароль"
}
```

## Шаг 3

### Проверка токена

Создай мидлвар для проверки токена и добавь его ко всем раутам которые должны
быть защищены.

- Мидлвар берет токен из заголовков `Authorization`, проверяет токен на
  валдность.
- В случае ошибки вернуть [#token-check-response](#token-check-response).
- Если валидация прошла успешно, получить из токена id пользователя. Найти
  пользователя в базе данных по этому id. Если пользователь существует, записать
  его данные в `req.user` и вызвать `next()`. Если пользователя с таким id не
  существет, вернуть [#token-check-response](#token-check-response)

#### token-check-response

```shell
Status: 401 UNATHORIZED
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
- Если пользователя не сущестует вернуть [#logout-error-response](#logout-error-response).
- В противном случае, удалить токен в текущем юзере и вернуть
  [#logout-success-response](#logout-success-response).

#### logout-request

```shell
POST /auth/logout
Authorization: "Bearer token"
```

#### logout-success-response

```shell
Status: 200 OK
Content-Type: application/json
ResponseBody: {
  "message": "Logout success"
}
```

#### logout-error-response

```shell
Status: 401 BAD
Content-Type: application/json
ResponseBody: {
  "message": "Not authorized"
}
```

### Текущий - получить данные юзера по токену

Создать ендпоинт [`/users/current`](#current-request)

Добавь в раут мидлвар проверки токена.

- Если пользователя не сущестует вернуть [#current-error-response](#current-error-response)
- В противном случае вернуть [#current-success-response](#current-success-response)

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

#### current-error-response

```shell
Status: 401 BAD
Content-Type: application/json
ResponseBody: {
  "message": "Not authorized"
}
```

## Дополнительное задание - необязательное

- Сделать пагинацию с
  [mongoose-paginate-v2](https://www.npmjs.com/package/mongoose-paginate-v2) для
  коллекции контактов (GET /contacts?page=1&limit=20).
- Сделать фильтрацию контактов по типу подписки (GET /contacts?sub=free)
- Обновление подписки (`subscription`) пользователя через эндпоинт PATCH /users. Подписка должна иметь одно из следующих значений `['free', 'pro', 'premium']`
