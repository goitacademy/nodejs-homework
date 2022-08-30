**Leer en otros idiomas: [Русский](README.md), [Українська](README.ua.md).**

# Tarea 1

## Paso 1

- Inicia npm en el proyecto
- En la raíz del proyecto, cree un archivo `index.js`
- Pon el paquete [nodemon](https://www.npmjs.com/package/nodemon) como dependencia de desarrollo (devDependencies)
- En el archivo `package.json` añade "scripts" para iniciar `index.js`
- El script `start` que lanza `index.js` mediante `node`
- El script `start:dev` que lanza `index.js` mediante `nodemon`

## Paso 2

En la raíz del proyecto cree una carpeta `db`. Descargue y utilice el archivo [contacts.json](./contacts.json) para almacenar los contactos, y colóquelo en la carpeta `db`.

Cree un archivo `contacts.js` en la raíz del proyecto.

- Importa los módulos `fs` y `path` para trabajar con el sistema de archivos.
- Cree una variable `contactsPath` y escribe en ella la ruta al archivo `contacts.json`. Utiliza los métodos del módulo `path` para elaborar la ruta.
- Añade funciones para trabajar con la colección de contactos. En las funciones, utiliza el módulo `fs` y sus métodos `readFile()` y `writeFile()`.
- Exporta las funciones creadas mediante `module.exports`.

```js
// contacts.js

/*
 * Comenta y anota el valor
 * const contactsPath = ;
 */

// TODO: documenta cada función
function listContacts() {
  // ...tu código
}

function getContactById(contactId) {
  // ...tu código
}

function removeContact(contactId) {
  // ...tu código
}

function addContact(name, email, phone) {
  // ...tu código
}
```

## Paso 3

Importa el módulo `contacts.js` en el archivo `index.js` y comprueba que las funciones para manipular los contactos funcionan.

## Paso 4

En el archivo `index.js` se importa el paquete `yargs` para facilitar el análisis de los argumentos de la línea de comandos. Utilice la función ya preparada `invokeAction()` que obtiene el tipo de acción a realizar y los argumentos necesarios. La función llama al método apropiado del archivo `contacts.js` pasándole los argumentos necesarios.

```js
// index.js
const argv = require('yargs').argv;

// TODO: рефакторить
function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      // ...
      break;

    case 'get':
      // ... id
      break;

    case 'add':
      // ... name email phone
      break;

    case 'remove':
      // ... id
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(argv);
```

También puede utilizar el módulo [commander](https://www.npmjs.com/package/commander) para hacer parsing a los argumentos de la línea de comandos. Esta es una alternativa más popular al módulo `yargs'.

```js
const { Command } = require('commander');
const program = new Command();
program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();

// TODO: рефакторить
function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      // ...
      break;

    case 'get':
      // ... id
      break;

    case 'add':
      // ... name email phone
      break;

    case 'remove':
      // ... id
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(argv);
```

## Paso 5

Ejecuta los comandos en el terminal y haz una captura de pantalla del resultado de cada comando.

```shell
# Obtenemos y mostramos la lista completa de contactos en forma de tabla (console.table).
node index.js --action list

# Obtenemos un contacto según su id
node index.js --action get --id 5

# Añadimos un contacto
node index.js --action add --name Mango --email mango@gmail.com --phone 322-22-22

# Eliminamos un contacto
node index.js --action remove --id 3
```

## Paso 6 - Entrega de la tarea.

Las capturas de pantalla de la ejecución de los comandos, se pueden subir a cualquier servicio gratuito de almacenamiento de imágenes en la nube (Ejemplo: [monosnap](https://monosnap.com/), [imgbb.com](https://imgbb.com/)) y los enlaces pertinentes deben añadirse al archivo README.md. Cree este archivo en la raíz del proyecto. Después, adjunte un enlace al repositorio con la tarea a [schoology](https://app.schoology.com/login) para que el mentor la revise.

## Requisitos para que sea admitida

- Repositorio creado con la tarea &mdash; aplicación CLI
- Tarea enviada al mentor en [schoology](https://app.schoology.com/login) para su revisión (enlace al repositorio)
- El código se ajusta a la tarea técnica del proyecto
- No se producen errores sin procesar durante la ejecución del código
- Los nombres de variables, propiedades y métodos comienzan con una letra minúscula y se escriben en notación CamelCase. Se utilizan sustantivos en inglés
- El nombre de las funciones o métodos contiene un verbo
- No hay secciones de código comentadas en el código
- El proyecto funciona correctamente en la versión LTS actual de Node
