**Czytaj w innych językach: [rosyjski](README.md), [ukraiński](README.ua.md).**

# Домашнее задание 4 Zadanie domowe 4

Создайте ветку `hw04-auth` из ветки `master`.
Utwórz gałąź `hw04-auth` z gałęzi `master`.

Продолжите создание REST API для работы с коллекцией контактов. Добавьте логику аутентификации/авторизации пользователя с помощью [JWT](https://jwt.io/).
Kontynuuj tworzenie REST API do pracy ze zbiorem kontaktów. Dodaj logikę uwierzytelnienia/utoryzacji użytkownika przy pomocy [JWT](https://jwt.io/).

## Шаг 1

В коде создайте схему и модель пользователя для коллекции `users`.

```js
{
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter"
  },
  token: {
    type: String,
    default: null,
  },
}
```

Чтобы каждый пользователь работал и видел только свои контакты в схеме контактов добавьте свойство `owner`
Aby każdy użytkownik działał i widział tylko swoje kontakty w schemacie kontaktów, dodaj właściwość `owner`.

```js
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    }
```
Примечание: `'user'` - название коллекции (в единственном числе), в которой хранятся пользователи.
Uwaga: `'user'` - nazwa zbioru (w liczbie pojedynczej), w którym zapisują się użytkownicy.


## Шаг 2 Krok 2

### Регистрация Rejestracja

Создайте эндпоинт [`/users/signup`](#registration-request)
Utwórz endpoint [`/users/signup`](#registration-request).

Сделать валидацию всех обязательных полей (`email` и `password`). При ошибке валидации вернуть
[Ошибку валидации](#registration-validation-error).

Zrób walidację wszystkich obowiązkowych pól (`email` i `password`). W przypadku błędu walidacji zwróć [Błąd walidacji](#registration-validation-error).

В случае успешной валидации в модели `User` создать пользователя по данным которые прошли валидацию. Для засолки паролей используй [bcrypt](https://www.npmjs.com/package/bcrypt) или [bcryptjs](https://www.npmjs.com/package/bcryptjs)
W przypadku sukcesu walidacji w modelu `User` utwórz użytkownika z danymi, które przeszły walidację. Dla wprowadzenia soli do haseł wykorzystaj [bcrypt](https://www.npmjs.com/package/bcrypt) lub [bcryptjs](https://www.npmjs.com/package/bcryptjs).

- Если почта уже используется кем-то другим, вернуть [Ошибку Conflict](#registration-conflict-error).
Jeśli poczta jest już wykorzystywana przez kogoś innego, zwróć [Błąd Conflict](#registration-conflict-error).
- В противном случае вернуть [Успешный ответ](#registration-success-response).
W przeciwnym razie zwróć [Sukces odpowiedzi](#registration-success-response).

#### Registration request

```shell
POST /users/signup
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
ResponseBody: <Ошибка от Joi или другой библиотеки валидации> Błąd od Joi lub innej biblioteki walidacji
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
    "subscription": "starter"
  }
}
```

### Логин Login

Создайте эндпоинт [`/users/login`](#login-request)
Utwórz endpoint [`/users/login`](#login-request).

В модели `User` найти пользователя по `email`.
W modelu `User` znajdź użytkownika po `email`.

Сделать валидацию всех обязательных полей (`email` и `password`). При ошибке валидации вернуть [Ошибку валидации](#validation-error-login).
Utwórz walidację wszystkich pól obowiązkowych (`email` i `password`). W przypadku błędu walidacji zwróć [Błąd walidacji](#validation-error-login).

- В противном случае, сравнить пароль для найденного юзера, если пароли совпадают создать токен, сохранить в текущем юзере и вернуть [Успешный ответ](#login-success-response).
W przeciwnym razie porównaj hasło dla znalezionego usera. Jeżeli hasła pokrywają się, utwórz token, zapisz w obecnym userze i zwróć [Sukces odpowiedzi](#login-success-response).
- Если пароль или email неверный, вернуть [Ошибку Unauthorized](#login-auth-error).
Jeżeli hasło lub email nie są dokładne, zwróć [Błąd Unauthorized](#login-auth-error).

#### Login request

```shell
POST /users/login
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
ResponseBody: <Ошибка от Joi или другой библиотеки  валидации> Błąd od Joi lub innej biblioteki walidacji
```

#### Login success response

```shell
Status: 200 OK
Content-Type: application/json
ResponseBody: {
  "token": "exampletoken",
  "user": {
    "email": "example@example.com",
    "subscription": "starter"
  }
}
```

#### Login auth error

```shell
Status: 401 Unauthorized
ResponseBody: {
  "message": "Email or password is wrong"
}
```

## Шаг 3 Krok 3

### Проверка токена Sprawdzenie tokena

Создайте мидлвар для проверки токена и добавь его ко всем маршрутам, которые должны быть защищены.
Utwórz oprogramowanie pośrdniczące tokenu i dodaj go do wszystkich tras, które powinny być chronione.

- Мидлвар берет токен из заголовков `Authorization`, проверяет токен на валидность.
Oprogramowanie pośredniczące bierze token z nagłówków `Authorization`, sprawdza token pod względem ważności.
- В случае ошибки вернуть [Ошибку Unauthorized](#middleware-unauthorized-error).
W przypadku błędu zwróć [Błąd Unauthorized](#middleware-unauthorized-error).
- Если валидация прошла успешно, получить из токена `id` пользователя. Найти пользователя в базе данных по этому id. 
Jeżli walidacja przeszła pomyślnie, otrzymaj z tokena `id` użytkownika. Znajdź użytkownika w bazie danych po tym id.
- Если пользователь существует и токен совпадает с тем, что находится в базе, записать его данные в `req.user` и вызвать метод`next()`. 
Jeśli użytkownik istniejej i token pokrywa się z tym, co znajduje się w bazie, zapisz jego dane w `req.user` i wywołaj metodę `next()`. 
- Если пользователя с таким `id` не существует или токены не совпадают, вернуть [Ошибку Unauthorized](#middleware-unauthorized-error)
Jeżeli użytkownika z takim `id` nie ma lub tokeny nie pokrywają się, zwróć [Błąd Unauthorized](#middleware-unauthorized-error).

#### Middleware unauthorized error

```shell
Status: 401 Unauthorized
Content-Type: application/json
ResponseBody: {
  "message": "Not authorized"
}
```

## Шаг 4 Krok 4

### Логаут Logout

Создайте ендпоинт [`/users/logout`](#logout-request)
Utwórz endpoint [`/users/logout`](#logout-request).

Добавьте в маршрут мидлвар проверки токена.
Dodaj do trasy program pośredniczący sprawdzania tokena.

- В модели `User` найти пользователя по `_id`.
W modelu `User` znajdź użytkownika po `_id`.
- Если пользователя не существует вернуть [Ошибку Unauthorized](#logout-unauthorized-error).
Jeżeli nie można zwrócić użytkownika [Błąd Unauthorized](#logout-unauthorized-error).
- В противном случае, удалить токен в текущем юзере и вернуть [Успешный ответ](#logout-success-response).
- W przeciwnym razie, usuń token w obecnym userze i zwróć [Sukces odpowiedzi](#logout-success-response).

#### Logout request

```shell
GET /users/logout
Authorization: "Bearer {{token}}"
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

## Шаг 5 Krok 5
### Текущий пользователь - получить данные юзера по токену Obecny użytkownik – otrzymaj dane usera zgodnie z tokenem

Создайте эндпоинт [`/users/current`](#current-user-request)
Utwórz endpoint [`/users/current`](#current-user-request).

Добавьте в маршрут мидлвар проверки токена.
Dodaj do trasy program pośredniczący sprawdzania tokena.

- Если пользователя не существует вернуть [Ошибку Unauthorized](#current-user-unauthorized-error)
Jeżeli użytkownik nie istnieje, zwróć [Błąd Unauthorized](#current-user-unauthorized-error).
- В противном случае вернуть [Успешный ответ](#current-user-success-response)
W przeciwnym razie zwróć [Sukces odpowiedzi](#current-user-success-response).

#### Current user request

```shell
GET /users/current
Authorization: "Bearer {{token}}"
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
  "subscription": "starter"
}
```

## Дополнительное задание - необязательное Zadanie dodatkowe – nieobowiązkowe

- Сделать пагинацию для коллекции контактов (GET /contacts?page=1&limit=20).
Stwórz paginację dla zbioru kontaktów (GET /contacts?page=1&limit=20).
- Сделать фильтрацию контактов по полю избранного (GET /contacts?favorite=true)
Utwórz filtrowanie kontaktów zgodnie z polem wybranego (GET /contacts?favorite=true).
- Обновление подписки (`subscription`) пользователя через эндпоинт `PATCH` `/users`. Подписка должна иметь одно из следующих   значений `['starter', 'pro', 'business']`
Aktualizacja subskrypcji (`subscription`) użytkownika przez endpoint `PATCH` `/users`. Subskrypcja powinn mieć jedną z następujących wartości `['starter', 'pro', 'business']`.
