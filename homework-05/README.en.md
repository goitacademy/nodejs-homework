**Read in other languages: [Russian](README.md), [Ukrainian](README.ua.md).**

# Homework 5

Create the `hw05-avatars` branch from the `master` branch.

Continue building a REST API to work with the contact collection. Add the ability to upload the user's avatar via [Multer](https://github.com/expressjs/multer).

## Step 1

Create a folder `public` for distribution of statics. In this folder make a folder `avatars`. Set up Express to serve static files from the `public` folder.

Put any image in the `public/avatars` folder and check that the static distribution works. When you navigate to such a URL, the browser will display the image.

```shell
http://localhost:<порт>/avatars/<filename with extension>
```

## Step 2

Add a new `avatarURL` property to the user schema to hold the image.

```shell
{
  ...
  avatarURL: String,
  ...
}
```

- Use the package [gravatar](https://www.npmjs.com/package/gravatar) to immediately generate an avatar for him by his `email` when registering a new user.

## Step 3

When registering a user:

- Create a link to the user's avatar with [gravatar](https://www.npmjs.com/package/gravatar)
- Save the resulting URL in the `avatarURL` field during user creation

## Step 4

Add the ability to update the avatar by creating an endpoint `/users/avatars` and using the `PATCH` method.

![avatar upload from postman](./avatar-upload.png)

```shell
# Запрос
PATCH /users/avatars
Content-Type: multipart/form-data
Authorization: "Bearer {{token}}"
RequestBody: uploaded file

# Successful response
Status: 200 OK
Content-Type: application/json
ResponseBody: {
  "avatarURL": "image link goes here"
}

# Unsuccessful response
Status: 401 Unauthorized
Content-Type: application/json
ResponseBody: {
  "message": "Not authorized"
}
```

- Create a folder tmp in the root of the project and save the uploaded avatar to it.
- Process the avatar with the [jimp] package (https://www.npmjs.com/package/jimp) and set its dimensions to 250 by 250
- Move the user's avatar from the tmp folder to the `public/avatars` folder and give it a unique name for the specific user.
- The resulting `URL` `/avatars/<file name with extension>` save in the user's `avatarURL` field

## Дополнительное задание - необязательное

### 1. Написать unit-тесты для контроллера входа (login/signin)

При помощи [Jest](https://jestjs.io/ru/docs/getting-started)

## Additional task - optional

### 1. Write unit tests for the login controller (login/signin)

Using [Jest](https://jestjs.io/ru/docs/getting-started)

- response must have status code 200
- the token must be returned in the response
- the response should return a `user` object with 2 fields `email` and `subscription`, having the data type `String`


