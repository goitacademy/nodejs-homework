**Read in other languages: [Russian](README.md), [Ukrainian](README.ua.md).**

# Homework 4

Create a `hw04-auth` branch from the `master` branch.

Continue building a REST API to work with the contact collection. Add user authentication/authorization logic using [JWT](https://jwt.io/).

## Step 1

In code, create a user schema and model for the `users` collection.

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

For each user to work and see only their contacts in the contact scheme, add the `owner` property.

```js
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    }
```
Note: `'user'` is the name of the collection (singular) in which users are stored.

## Step 2

### Registration

Create an endpoint [`/users/signup`](#registration-request).

Validate all required fields (`email` and `password`). Return on validation error
[Validation error](#registration-validation-error).

In case of successful validation in the `User` model, create a user according to the data that has passed validation. For password salting use [bcrypt](https://www.npmjs.com/package/bcrypt) or [bcryptjs](https://www.npmjs.com/package/bcryptjs).

- If the mail is already in use by someone else, return [Error Conflict](#registration-conflict-error).
- Otherwise return [Successful response](#registration-success-response).

#### Registration Request

```shell
POST /users/signup
Content-Type: application/json
RequestBody: {
  "email": "example@example.com",
  "password": "examplepassword"
}
```

#### Registration Validation Error

```shell
Status: 400 Bad Request
Content-Type: application/json
ResponseBody: <Error from Joi or another validation library>
```

#### Registration Conflict Error

```shell
Status: 409 Conflict
Content-Type: application/json
ResponseBody: {
  "message": "Email in use"
}
```

#### Registration Success Response

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

Create an endpoint [`/users/login`](#login-request)

In the `User` model, find the user by `email`.

Validate all required fields (`email` and `password`). If validation fails, return [Validation Error](#validation-error-login).

- Otherwise, compare password for found user, if passwords match create token, store in current user and return a [Successful response](#login-success-response).

- If password or email is incorrect, return [Error Unauthorized](#login-auth-error).

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
ResponseBody: <Error from Joi or another validation library>
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

## Step 3

### Checking the token

Create a middleware to validate the token and add it to all routes that need to be secured.

- Middleware takes the token from the `Authorization` headers, checks the token for validity
- Return [Unauthorized Error](#middleware-unauthorized-error) on error
- If the validation was successful, get the user's `id` from the token. Find a user in the database by this id
- If the user exists and the token matches what is in the database, write his data to `req.user` and call the `next()` method
- If no user with that `id` exists or tokens don't match, return [Unauthorized Error](#middleware-unauthorized-error)

#### Middleware unauthorized error

```shell
Status: 401 Unauthorized
Content-Type: application/json
ResponseBody: {
  "message": "Not authorized"
}
```

## Step 4

### Logout

Create an endpoint [`/users/logout`](#logout-request)

Add token verification middleware to the route.

- In the `User` model, find the user by `_id`
- If the user does not exist, return [Error Unauthorized](#logout-unauthorized-error)
- Otherwise, delete the token in the current user and return [Successful response](#logout-success-response)

#### Logout Request

```shell
GET /users/logout
Authorization: "Bearer {{token}}"
```

#### Logout Unauthorized Error

```shell
Status: 401 Unauthorized
Content-Type: application/json
ResponseBody: {
  "message": "Not authorized"
}
```

#### Logout Success Response

```shell
Status: 204 No Content
```

## Step 5
### Current User - Get User Data by Token

Create an endpoint [`/users/current`](#current-user-request)

Add token verification middleware to the route.

- If user does not have return [Error Unauthorized](#current-user-unauthorized-error)
- Otherwise, return [Successful response](#current-user-success-response)

#### Current User Request

```shell
GET /users/current
Authorization: "Bearer {{token}}"
```

#### Current User Unauthorized Error

```shell
Status: 401 Unauthorized
Content-Type: application/json
ResponseBody: {
  "message": "Not authorized"
}
```

#### Current User Success Response

```shell
Status: 200 OK
Content-Type: application/json
ResponseBody: {
  "email": "example@example.com",
  "subscription": "starter"
}
```

## Additional Task - Optional

- Make pagination for the collection of contacts (GET /contacts?page=1&limit=20)
- Filter contacts by favorite field (GET /contacts?favorite=true)
- Updating a user's `subscription` via the `PATCH` `/users` endpoint. The subscription must have one of the following values `['starter', 'pro', 'business']`
