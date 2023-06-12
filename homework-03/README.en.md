**Read in other languages: [Russian](README.md), [Ukrainian](README.ua.md).**

# Homework 3

Create branch `hw03-mongodb` from `master` branch.

Continue building a REST API to work with the contact collection.

## Step 1

Create an account on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas). Then create a new project in your account and set up a **free cluster**. When setting up the cluster, select the provider and region as in the screenshot below. If you select a region that is too remote, the server response time will be slower.

![atlas cluster setup](./atlas-cluster.jpg)

## Step 2

Install the graphical editor [MongoDB Compass](https://www.mongodb.com/products/compass) for convenient work with the database for MongoDB. Set up your cloud database connection to Compass. In MongoDB Atlas, don't forget to create an admin user.

## Step 3

Through Compass, create the `db-contacts` database and the `contacts` collection in it. Take [link to json](./contacts.json) and use Compass to populate the `contacts` collection (make an import) with its contents.

![data](./json-data.png)

If you did everything right, the data should appear in your database in the `contacts` collection

![data](./mongo-data.png)
## Step 4

Use the source code of [homework #2](../homework-02/README.md) and replace the contact storage from the json file with the database you created.

- Write code to create a connection to MongoDB using [Mongoose](https://mongoosejs.com/).
- If the connection is successful, print the message `"Database connection successful"` to the console.
- Be sure to handle the connection error. Print an error message to the console and terminate the process using `process.exit(1)`.
- In the request processing functions, replace the code for CRUD operations on contacts from a file with Mongoose methods for working with a collection of contacts in the database.

Model schema for the `contacts` collection:

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

## Step 5

We have an additional status field `favorite` in contacts, which takes the boolean value `true` or `false`. It is responsible for the fact that the specified contact is in the favorites or not. Implement a new route to update contact status.

### @ PATCH /api/contacts/:id/favorite

- Gets the `contactId` parameter
- Gets `body` in JSON format with the update of the `favorite` field
- If there is no `body`, returns JSON with key `{"message": "missing field favorite"}` and status `400`
- If everything is fine with `body`, call the `updateStatusContact(contactId, body)` function (write it) to update the contact in the database
- Based on the result of the function, it returns an updated contact object with a status of `200`. Otherwise, returns JSON with `"message": "Not found"` key and `404` status


For the `POST /api/contacts` route, make changes: If the `favorite` field is not specified in `body`, then when saving a new contact to the database, make the `favorite` field equal to the default `false`. Don't forget about data validation!
