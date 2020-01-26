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
  }
}
```

## Шаг 2

### Регистрация

Сделать валидацию всех обязательных полей (email и password). При ошибке
валидации вернуть `# Неуспешный ответ при отсутсвующих полях`.

В случае успешной валидации в модели `User` создать пользователя по данным
которые прошли валидацию. Для засолки паролей используй
[bcrypt](https://www.npmjs.com/package/bcrypt)

- Если почта уже используется, вернуть
  `# Неуспешный ответ при совпадении почты`.
- В противном случае вернуть `# Успешный ответ`.

```shell
# Запрос
POST /auth/register
Content-Type: application/json
RequestBody: {
  "email": "example@example.com",
  "password": "examplepassword"
}

# Успешный ответ
Status: 201 Created
Content-Type: application/json
ResponseBody: {
  "token": "exampletoken",
  "user": {
    "email": "example@example.com",
    "subscription": "free"
  }
}

# Неуспешный ответ при отсутсвующих полях
Status: 422 BAD
Content-Type: application/json
ResponseBody: {
  "message": "Missing required fields"
}

# Неуспешный ответ при совпадении почты
Status: 400 BAD
Content-Type: application/json
ResponseBody: {
  "message": "Email in use"
}
```

### Логин

В модели `User` найти пользователя по `email`.

- Если пользователя не сущестует вернуть `# Неуспешный ответ`.
- В противном случае, сравнить пароль для найденного юзера, если пароли
  совпадают создать токен, сохранить в текущем юзере и вернуть
  `# Успешный ответ`.
- Если пароль не верный, вернуть `# Неуспешный ответ`.

```shell
# Запрос
POST /auth/login
Content-Type: application/json
RequestBody: {
  "email": "example@example.com",
  "password": "examplepassword"
}

# Успешный ответ
Status: 200 OK
Content-Type: application/json
ResponseBody: {
  "token": "exampletoken",
  "user": {
    "email": "example@example.com",
    "subscription": "free"
  }
}

# Неуспешный ответ
Status: 400 BAD
Content-Type: application/json
ResponseBody: {
  "message": "Неверный логин или пароль"
}
```

## Шаг 3

Создай мидлвар для проверки токена и добавь его ко всем раутам которые должны
быть защищены.

- Мидлвар берет токен из заголовков `Authorization`, проверяет токен на
  валдность.
- В случае ошибки вернуть `# Неуспешный ответ`.
- Если валидация прошла успешно, получить из токена id пользователя. Найти
  пользователя в базе данных по этому id. Если пользователь существует, записать
  его данные в `req.user` и вызвать `next()`. Если пользователя с таким id не
  существет, вернуть `# Неуспешный ответ`

```shell
# Неуспешный ответ
Status: 401 UNATHORIZED
Content-Type: application/json
ResponseBody: {
  "message": "Not authorized"
}
```

## Шаг 4

### Логаут

Добавь в раут мидлвар проверки токена.

- В модели `User` найти пользователя по `email`.
- Если пользователя не сущестует вернуть `# Неуспешный ответ`.
- В противном случае, сравнить пароль для найденного юзера, если пароли
  совпадают создать токен, сохранить в текущем юзере и вернуть
  `# Успешный ответ`.
- Если пароль не верный, вернуть `# Неуспешный ответ`.

```shell
# Запрос
POST /auth/logout
Authorization: "Bearer token"

# Успешный ответ
Status: 200 OK
Content-Type: application/json
ResponseBody: {
  "message": "Logout success"
}

# Неуспешный ответ
Status: 401 BAD
Content-Type: application/json
ResponseBody: {
  "message": "Not authorized"
}
```

### Текущий

Добавь в раут мидлвар проверки токена.

- Если пользователя не сущестует вернуть `# Неуспешный ответ`
- В противном случае вернуть `# Успешный ответ`

```shell
# Запрос
GET /auth/current
Authorization: "Bearer token"

# Успешный ответ
Status: 200 OK
Content-Type: application/json
ResponseBody: {
  "email": "example@example.com",
  "subscription": "free"
}

# Неуспешный ответ
Status: 401 BAD
Content-Type: application/json
ResponseBody: {
  "message": "Not authorized"
}
```

# Дополнительное задание - необязательное

- Сделать пагинацию с
  [mongoose-paginate-v2](https://www.npmjs.com/package/mongoose-paginate-v2) для
  коллекции контактов (GET /contacts?page=1&limit=20).
- Сделать сортировку контактов по типу подписки (GET /contacts?sub=free)
- Удаление всех данных пользователя при удалении аккаунта (DELETE /users)
- Обновление данных пользователя (PATCH /users)
