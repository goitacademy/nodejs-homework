**Leer en otros idiomas: [Русский](README.md), [Українська](README.ua.md).**

# Tarea 4

Crea una rama `hw04-auth` de la rama `master`.

Continúe con la creación de una API REST para manejar la colección de contactos. Añadir la lógica de autenticación/autorización de usuarios mediante [JWT](https://jwt.io/).

## Paso 1

En el código, crea un esquema y un modelo de usuario para la colección `users`.

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

Para que cada usuario funcione y vea sólo sus propios contactos en el esquema de contactos, añada la propiedad `owner`.

```js
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    }
```
Nota: `'user'` es el nombre de la colección (única) en la que se almacenan los usuarios.

## Paso 2

### Registro

Crea el endpoint [`/users/signup`](#registration-request)

Valida todos los campos obligatorios (`email` y `password`). Si se produce un error de validación, devuelve
[error de validación](#registration-validation-error).

Si la validación es exitosa en el modelo `User`, crea un usuario basado en los datos validados. Para ponerle sal a las contraseñas, utilice [bcrypt](https://www.npmjs.com/package/bcrypt) o [bcryptjs](https://www.npmjs.com/package/bcryptjs)

- Si el correo ya está en uso por otra persona, devuelve [Error Conflict](#registration-conflict-error).
- En caso contrario, devuelve [Respuesta exitosa](#registration-success-response).

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
ResponseBody: <Error de Joi u otra biblioteca de validación>
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

Crea el endpoint [`/users/login`](#login-request)

En el modelo `User`, busca el usuario por `email`.

Valide todos los campos obligatorios (`email` y `password`). Si la validación falla, devuelve [Error de validación](#validation-error-login).

- En caso contrario, compara la contraseña del usuario encontrado, si las contraseñas coinciden crea un token, guárdalo en el usuario actual y devuelve [Respuesta exitosa](#login-success-response).
- Si la contraseña o el correo electrónico son incorrectos, devuelve [Error Unauthorized](#login-auth-error).

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
ResponseBody: <Error de Joi u otra biblioteca de validación>
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

## Paso 3

### Comprobación del token

Crea un middleware para comprobar el token y añádelo a todas las rutas que deban ser protegidas.

- El middleware toma el token de los encabezados de `Authorization`, comprueba la validez del token.
- En caso de error, devuelve [Error Unauthorized](#middleware-unauthorized-error).
- Si la validación es exitosa, recupera el `id` del usuario del token. Encuentra el usuario en la base de datos a partir de este ID. 
- Si el usuario existe y el token coincide con el de la base de datos, escribe sus datos en `req.user` y llama al método `next()`. 
- Si el usuario con este `id` no existe o los tokens no coinciden, devuelve [Error Unauthorized](#middleware-unauthorized-error)

#### Middleware unauthorized error

```shell
Status: 401 Unauthorized
Content-Type: application/json
ResponseBody: {
  "message": "Not authorized"
}
```

## Paso 4

### Logout

Crea el endpoint [`/users/logout`](#logout-request)

Añade a la ruta el middleware para la comprobacióon de tokens.

- En el modelo `User`, busca el usuario por `_id`.
- Si el usuario no existe, devuelve [Error Unauthorized](#logout-unauthorized-error).
- En caso contrario, elimina el token en el usuario actual y devuelve [Respuesta exitosa](#logout-success-response).

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

## Paso 5
### Usuario actual. Recuperar los datos del usuario según el token

Crea el endpoint [`/users/current`](#current-user-request)

Añade a la ruta el middleware para la comprobacióon de tokens.

- Si el usuario no existe, devuelve [Error Unauthorized](#current-user-unauthorized-error)
- EN caso contrario devuelve [Respuesta exitosa](#current-user-success-response)

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

## Tarea adicional (opcional)

- Hacer una paginación de la colección de contactos (GET /contacts?page=1&limit=20).
- Filtra los contactos por favoritos (GET /contacts?favorite=true)
- Renovación de la suscripción (`subscription`) del usuario a travez del endpoint `PATCH` `/users`. La suscripción debe tener uno de los siguientes valores `['starter', 'pro', 'business']`
