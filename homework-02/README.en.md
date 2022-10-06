**Read in other languages: [Russian](README.md), [Ukrainian](README.ua.md).**

# Homework 2

Fork [repository](https://github.com/goitacademy/nodejs-homework-template) to your github account.

Watch an explanation video on how to do this and submit your homework correctly: [<img src="./js.png" width="640">](https://www.youtube.com/watch?v=wabSW_sz_cM 'Explanation' )

Write a REST API to work with a collection of contacts. To work with the REST API, use [Postman](https://www.getpostman.com/).

Read carefully the readme in the cloned boilerplate, it describes the mechanism for submitting homework. Start doing homework.

## Step 1

Create branch `hw02-express` from master branch.

Install the modules with the command:

```bash
npm i
```

The following modules are already in the project:

- [Express](https://www.npmjs.com/package/express)
- [Morgan](https://www.npmjs.com/package/morgan)
- [CORS](https://www.npmjs.com/package/cors)

## Step 2

App.js is a web server on express, `morgan` and `cors` layers are added. Start setting up routing to work with your contacts collection.

The REST API must support the following routes.

### @ GET /api/contacts

- Gets nothing
- Calls the `listContacts` function to work with the JSON file `contacts.json`
- Returns an array of all contacts in json format with status `200`

### @ GET /api/contacts/:id

- Doesn't get `body`
- Gets the `id` parameter
- Calls the getById function to work with the contacts.json JSON file
- If there is such an id, returns the contact object in JSON format with status `200`
- If there is no such id, returns json with `"message": "Not found"` key and `404` status

### @ POST /api/contacts

- Gets `body` in `{name, email, phone}` format (all fields are required)
- If there are no required fields in body, returns JSON with key `{"message": "missing required name field"}` and status `400`
- If everything is fine with `body`, add a unique identifier to the contact object
- Calls the `addContact(body)` function to save the contact in the `contacts.json` file
- Based on the result of the function, it returns an object with the added `id` `{id, name, email, phone}` and status `201`

### @ DELETE /api/contacts/:id

- Doesn't get `body`
- Gets the `id` parameter
- Calls the `removeContact` function to work with the JSON file `contacts.json`
- If there is such an `id`, it returns JSON of the format `{"message": "contact deleted"}` with status `200`
- If there is no such `id`, returns JSON with the key `"message": "Not found"` and status `404`

### @ PUT /api/contacts/:id

- Gets the `id` parameter
- Gets `body` in JSON format, updating any `name, email and phone` fields
- If there is no `body`, returns json with key `{"message": "missing fields"}` and status `400`
- If everything is fine with `body`, call the `updateContact(contactId, body)` function (write it) to update the contact in the `contacts.json` file
- Based on the result of the function, it returns an updated contact object with a status of `200`. Otherwise, returns json with `"message": "Not found"` key and `404` status

## Step 3

For routes that accept data (`POST` and `PUT`), consider validating the received data. To validate received data, use the [joi] package (https://github.com/sideway/joi).

## Homework #2-6 Submission Criteria

- Created a repository with homework &mdash; REST API application
- When creating the repository, [boilerplate] was used (https://github.com/goitacademy/nodejs-homework-template)
- A pull request (PR) with the corresponding homework was sent to the mentor at [Schoology](https://app.schoology.com/login) for review (link to PR)
- The code corresponds to the terms of reference of the project
- No unhandled errors when executing code
- The names of variables, properties and methods start with a lowercase letter and are written in CamelCase notation. English nouns are used
- The name of the function or method contains a verb
- There are no commented sections of code in the code
- The project works correctly in the current LTS version of Node
