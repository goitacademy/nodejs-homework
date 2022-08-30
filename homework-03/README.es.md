**Leer en otros idiomas: [Русский](README.md), [Українська](README.ua.md).**

# Tarea 3

Crea una rama `hw03-mongodb` de la rama `master`.

Continúa con la creación de la API REST para trabajar con una colección de contactos.

## Paso 1

Crea una cuenta en [MongoDB Atlas](https://www.mongodb.com/cloud/atlas). A continuación, cree un nuevo proyecto en su cuenta y configure un **clúster gratuito**. Cuando configure el clúster, seleccione su ISP y su región como se muestra en la captura de pantalla siguiente. Si elige una región demasiado alejada, la velocidad de respuesta del servidor será más lenta.

![atlas cluster setup](./atlas-cluster.jpg)

## Paso 2

Instala el redactor gráfico [MongoDB Compass](https://www.mongodb.com/download-center/compass) para un funcionamiento sencillo de la base de datos para MongoDB. Configure la conexión de su base de datos en la nube con Compass. En MongoDB Atlas, recuerda crear un usuario con privilegios de administrador.

## Paso 3

Utilice Compass para crear una base de datos `db-contacts` y cree una colección `contacts` en ella. Usando el [link a json](./contacts.json) y utilizando Compass, llena la colección `contacts` (importándolo) con su contenido.

![data](./json-data.png)

Si lo has hecho correctamente, los datos deberían aparecer en tu base de datos en la colección `contacts`.

![data](./mongo-data.png)
## Paso 4

Utiliza el código fuente [tarea #2](../homework-02/README.md) y sustituye el almacenamiento de contactos del archivo json, por la base de datos que has creado.

- Escribe el código para crear una conexión a MongoDB usando [Mongoose](https://mongoosejs.com/).
- Si la conexión tiene éxito, muestra en la consola el mensaje `"Database connection successful"`.
- Asegúrese de atender el error de conexión. Muestra un mensaje de error en la consola y termina el proceso usando `process.exit(1)`.
- En las funciones de consulta, sustituya el código de las operaciones CRUD sobre contactos del archivo, por métodos de Mongoose para trabajar con una colección de contactos en la base de datos.

Esquema del modelo de la colección `contacts`:

```js
  {
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  }
```

## Paso 5

Tenemos un campo de estado adicional `favorite` en los contactos, que toma un valor booleano de `true` o `false`. Es responsable de que el contacto especificado esté o no en favoritos. Implementa una nueva ruta para actualizar el estado del contacto

### @ PATCH /api/contacts/:id/favorite

- Recibe el parámetro `contactId`
- Recibe `body` en formato json con el campo `favorito` actualizado
- Si no se encuentra `body`, devuelve un json con la llave `{"message": "missing field favorite"}` y el estado `400`.
- Si `body` está bien, llama a la función `updateStatusContact(contactId, body)` (escríbela) para actualizar el contacto en la base de datos
- La función devuelve un objeto de contacto actualizado con el estado `200`. En caso contrario, devuelve el json con la llave `"message": "Not found"` y el estado `404`.


Para el route `POST /api/contacts`, haz un cambio: si el campo `favorite` no se especifica en `body`, haz que el campo `favorite` sea por defecto `false` al guardar un nuevo contacto en la base de datos. No te olvides de la validación de los datos.
