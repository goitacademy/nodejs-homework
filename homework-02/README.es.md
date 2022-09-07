**Leer en otros idiomas: [Русский](README.md), [Українська](README.ua.md).**

# Tarea 2

Crea un [repositorio](https://github.com/goitacademy/nodejs-homework-template) fork en tu cuenta de github.

Mira el vídeo explicativo sobre cómo hacerlo y entrega la tarea correctamente: [<img src="./js.png" width="640">](https://www.youtube.com/watch?v=wabSW_sz_cM 'Explicación')

Escribir una API REST para trabajar con una colección de contactos. Para trabajar con la API REST, utilice [Postman](https://www.getpostman.com/).

Lee atentamente el "readme" en el boilerplate clonado, allí se describe el mecanismo de entrega de las tareas. Procede a realizar la tarea

## Paso 1

Crea una rama `hw02-express` desde la rama master.

Instala los módulos con el comando:

```bash
npm i
```

Los siguientes módulos ya están en el proyecto:

- [express](https://www.npmjs.com/package/express)
- [morgan](https://www.npmjs.com/package/morgan)
- [cors](https://www.npmjs.com/package/cors)

## Paso 2

En app.js, servidor web en express, se han añadido las capas `morgan` y `cors`. Comience a configurar el routing para trabajar con la colección de contactos.

La API REST debe soportar los siguientes routes.

### @ GET /api/contacts

- no recibe nada
- llama a la función `listContacts` para manipular el archivo json `contacts.json`
- devuelve un array de todos los contactos en formato json con estado `200`

### @ GET /api/contacts/:id

- no recibe `body`
- Recibe el parámetro `id`
- llama a la función getById para manipular el archivo contacts.json
- si este id existe, devuelve el objeto de contacto en formato json con un estado de `200`
- si no existe tal id, devuelve un json con la llave `"message": "Not found"` y el estado `404`

### @ POST /api/contacts

- Recibe `body` en formato `{name, email, phone}` (todos los campos son obligatorios)
- Si el cuerpo no tiene alguno de los campos obligatorios, devuelve un json con la llave `{"message": "missing required name field"}` y el estado `400`
- Si `body` está bien, añade un identificador único al objeto de contacto
- Llama a la función `addContact(body)` para guardar los contactos en formato `contacts.json`
- El resultado de la función devuelve el objeto con `id` `{id, name, email, phone}` añadido y el estado `201`

### @ DELETE /api/contacts/:id

- No recibe `body`
- Recibe el parámetro `id`
- llama a la función `removeContact` para manejar el archivo json `contacts.json`
- si dicho `id` existe, devuelve json en formato `{"mensaje": "contacto eliminado"}` y estado `200`.
- si no existe tal `id`, devuelve un json con la llave `"message": "Not found"` y el estado `404`.

### @ PUT /api/contacts/:id

- Recibe el parámetro `id`
- Recibe `body` en formato json con cualquiera de los campos `name, email и phone` actualizados
- Si no hay `body`, devuelve un json con la llave `{"message": "missing fields"}` y el estado `400`
- Si `body` está bien, llama a la función `updateContact(contactId, body)` (escríbela) para actualizar el contacto en el archivo `contacts.json`.
- La función devuelve un objeto de contacto actualizado con el estado `200`. En caso contrario, devuelve el json con la llave `"message": "Not found"` y el estado `404`.

## Paso 3

Para las rutas que reciben datos (`POST` y `PUT`), piense cómo comprobar (validar) los datos recibidos. Para validar los datos recibidos, utilice el paquete [joi](https://github.com/sideway/joi)

## Criterios de aceptación de las tareas #2-6

- Repositorio creado con la tarea &mdash; Aplicación API REST
- En la creación del repositorio se utilizó [boilerplate](https://github.com/goitacademy/nodejs-homework-template)
- Se envió un Pull-Request (PR) con la tarea indicada al mentor en [schoology](https://app.schoology.com/login) para ser revisada (link al PR)
- El código se ajusta a la tarea tñecnica del proyecto
- No se producen errores sin procesar durante la ejecución del código
- Los nombres de variables, propiedades y métodos comienzan con una letra minúscula y se escriben en notación CamelCase. Se usan sustantivos en inglés
- El nombre de la función o método contiene un verbo
- No hay secciones de código comentadas
- El proyecto funciona correctamente en la versión LTS actual de Node
