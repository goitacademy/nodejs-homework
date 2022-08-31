**Leer en otros idiomas: [Русский](README.md), [Українська](README.ua.md).**

# Tarea 5

Crea una rama `hw05-avatars` de la rama `master`.

Continúe construyendo la API REST para su colección de contactos. Añade la posibilidad de subir el avatar de usuario a través de [Multer](https://github.com/expressjs/multer).

## Paso 1

Crea una carpeta `public` para la distribución de los archivos estáticos. Crea una carpeta llamada `avatars` en esta carpeta. Configura Express para que distribuya los archivos estáticos de la carpeta `public`.

Coloca cualquier imagen en la carpeta `public/avatars` y asegúrate de que la distribución de archivos estáticos funciona. Al ir a esta URL, el navegador mostrará la imagen.

```shell
http://localhost:<порт>/avatars/<nombre de archivo con extensión>
```

## Paso 2

Añade una nueva propiedad `avatarURL` al esquema de usuario para almacenar la imagen.

```shell
{
  ...
  avatarURL: String,
  ...
}
```

- Utilice el paquete [gravatar](https://www.npmjs.com/package/gravatar) para generar inmediatamente un avatar cuando se registra un nuevo usuario, basandose en el `email` del usuario. 

## Paso 3

Al registrarse un usuario:

- Crea un enlace al avatar del usuario utilizando [gravatar](https://www.npmjs.com/package/gravatar)
- Durante la creación del usuario, guarda la URL resultante en el campo `avatarURL` durante la creación del usuario

## Paso 4

Añade la posibilidad de actualizar tu avatar creando un endpoint `/users/avatars` y utilizando el método `PATCH`.

![avatar upload from postman](./avatar-upload.png)

```shell
# Petición
PATCH /users/avatars
Content-Type: multipart/form-data
Authorization: "Bearer {{token}}"
RequestBody: archivo cargado

# Respuesta exitosa
Status: 200 OK
Content-Type: application/json
ResponseBody: {
  "avatarURL": "aquí habrá un enlace a la imagen"
}

# Respuesta fallida
Status: 401 Unauthorized
Content-Type: application/json
ResponseBody: {
  "message": "Not authorized"
}
```

- Crea una carpeta tmp en la raíz del proyecto y guarda en ella el avatar subido.
- Procesa el avatar con el paquete [jimp](https://www.npmjs.com/package/jimp) y asignales una dimensión de 250 por 250
- Mueve el avatar del usuario de la carpeta tmp a la carpeta `public/avatars` y dale un nombre único para el usuario específico.
- Guardar la `URL` recuperada `/avatars/<nombre de archivo con extensión>` en el campo `avatarURL` del usuario

## Tarea adicional (opcional)

### 1. Escribir pruebas unitarias para el controlador de entrada (login/signin)

Usando [Jest](https://jestjs.io/ru/docs/getting-started)

- la respuesta debe tener un código de estado de 200
- la respuesta debe devolver un token
- La respuesta debe devolver un objeto `user` con 2 campos `email` y `subscription` de tipo de datos `String`

