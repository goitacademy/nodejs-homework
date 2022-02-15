**Czytaj w innych językach: [rosyjski](README.md), [ukraiński](README.ua.md).**

# Zadanie domowe 4

Utwórz gałąź `hw04-auth` z gałęzi `master`.

Kontynuuj tworzenie REST API do pracy ze zbiorem kontaktów. Dodaj logikę uwierzytelnienia/autoryzacji użytkownika przy pomocy [JWT](https://jwt.io/).

## Krok 1

Utwórz w kodzie schemat i model użytkownika dla zbioru `users`.

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

Aby każdy użytkownik działał i widział tylko swoje kontakty w schemacie kontaktów, dodaj właściwość `owner`.

```js
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    }
```
Uwaga: `'user'` - nazwa zbioru (w liczbie pojedynczej), w którym zapisują się użytkownicy.


## Krok 2

### Rejestracja

Utwórz endpoint [`/users/signup`](#registration-request).

Zrób walidację wszystkich obowiązkowych pól (`email` i `password`). W przypadku błędu walidacji zwróć [Błąd walidacji](#registration-validation-error).

W przypadku pomyślnej walidacji w modelu `User` utwórz użytkownika z danymi, które przeszły walidację. Dla wprowadzenia soli do haseł wykorzystaj [bcrypt](https://www.npmjs.com/package/bcrypt) lub [bcryptjs](https://www.npmjs.com/package/bcryptjs).

- Jeśli poczta jest już wykorzystywana przez kogoś innego, zwróć [Błąd Conflict](#registration-conflict-error).
- W przeciwnym razie zwróć [Sukces odpowiedzi](#registration-success-response).

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
ResponseBody: <Błąd z Joi lub innej biblioteki walidacji> 
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

### Login

Utwórz endpoint [`/users/login`](#login-request).

W modelu `User` znajdź użytkownika po `email`.

Utwórz walidację wszystkich pól obowiązkowych (`email` i `password`). W przypadku błędu walidacji zwróć [Błąd walidacji](#validation-error-login).

- W przeciwnym razie porównaj hasło dla znalezionego usera. Jeżeli hasła pokrywają się, utwórz token, zapisz w obecnym userze i zwróć [Sukces odpowiedzi](#login-success-response).
- Jeżeli hasło lub email nie są dokładne, zwróć [Błąd Unauthorized](#login-auth-error).

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
ResponseBody: <Błąd z Joi lub innej biblioteki walidacji> 
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

## Krok 3

### Sprawdzenie tokena

Utwórz oprogramowanie pośredniczące tokena i dodaj je do wszystkich tras, które powinny być chronione.

- Oprogramowanie pośredniczące bierze token z nagłówków `Authorization`, sprawdza token pod względem ważności.
- W przypadku błędu zwróć [Błąd Unauthorized](#middleware-unauthorized-error).
- Jeżeli walidacja przeszła pomyślnie, otrzymaj z tokena `id` użytkownika. Znajdź użytkownika w bazie danych po tym id.
- Jeśli użytkownik istnieje i token pokrywa się z tym, co znajduje się w bazie, zapisz jego dane w `req.user` i wywołaj metodę `next()`. 
- Jeżeli użytkownika z takim `id` nie ma lub tokeny nie pokrywają się, zwróć [Błąd Unauthorized](#middleware-unauthorized-error).

#### Middleware unauthorized error

```shell
Status: 401 Unauthorized
Content-Type: application/json
ResponseBody: {
  "message": "Not authorized"
}
```
Krok 4

### Logout

Utwórz endpoint [`/users/logout`](#logout-request).

Dodaj do trasy program pośredniczący sprawdzania tokena.

- W modelu `User` znajdź użytkownika po `_id`.
- Jeżeli nie można zwrócić użytkownika [Błąd Unauthorized](#logout-unauthorized-error).
- W przeciwnym razie usuń token w obecnym userze i zwróć [Sukces odpowiedzi](#logout-success-response).

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

## Krok 5
### Obecny użytkownik – otrzymaj dane usera zgodnie z tokenem

Utwórz endpoint [`/users/current`](#current-user-request).

Dodaj do trasy program pośredniczący sprawdzania tokena.

- Jeżeli użytkownik nie istnieje, zwróć [Błąd Unauthorized](#current-user-unauthorized-error).
- W przeciwnym razie zwróć [Sukces odpowiedzi](#current-user-success-response).

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

## Zadanie dodatkowe – nieobowiązkowe

- Stwórz paginację dla zbioru kontaktów (GET /contacts?page=1&limit=20).
- Utwórz filtrowanie kontaktów zgodnie z polem wybranego (GET /contacts?favorite=true).
- Aktualizacja subskrypcji (`subscription`) użytkownika przez endpoint `PATCH` `/users`. Subskrypcja powinna mieć jedną z następujących wartości `['starter', 'pro', 'business']`.
