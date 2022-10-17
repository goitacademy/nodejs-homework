**Read in other languages: [Russian](README.md), [Ukrainian](README.ua.md).**

# Homework 6

Create branch `hw06-email` from branch `master`.

We continue to create a REST API for working with a collection of contacts. Add user email verification after registration using the [SendGrid](https://sendgrid.com/) service.

## How the Verification Process Should Work

1. After registration, the user should receive a letter to the email address specified during registration with a link to verify his email
2. After clicking the link in the received email for the first time, the user should receive a [Response with status 200](#verification-success-response), which will imply successful email verification
3. After clicking on the link again, the user should get [Error with status 404](#verification-user-not-found)

## Step 1

### Preparing Integration with SendGrid API

- Register at [SendGrid](https://sendgrid.com/)
- Create an email sender. To do this, in the SendGrid administrative panel, go to the Marketing menu in the senders submenu and click the "Create New Sender" button in the upper right corner. Fill in the required fields in the proposed form. Save. You should get the following result as in the picture, only with your email instead.

![sender](sender-not-verify.png)

A verification email should be sent to the specified email address (check spam if you don't see the email). Click on the link in it and complete the process. The result should change to:

![sender](sender-verify.png)

- Now you need to create an API access token. Select the "Email API" menu, and the "Integration Guide" submenu. Here we select "Web API"

![api-key](web-api.png)

Next, you need to select the Node.js technology

![api-key](node.png)

In the third step, we give a name to our token. For example systemcats, we press the generate button and we get the result as in the screenshot below. You need to copy this token (this is important because you won't be able to see it anymore). After completing the token creation process:

![api-key](api-key.png)

- The resulting API token must be added to the `.env` file in our project

## Step 2

### Create an Endpoint for Email Verification

- Add two fields `verificationToken` and `verify` to the `User` model. A value of the `verify` field equal to `false` will mean that his email has not been verified yet.

```js
{
  verify: {
    type: Boolean,
    default: false,
  },
  verificationToken: {
    type: String,
    required: [true, 'Verify token is required'],
  },
}
```

- Create a GET [`/users/verify/:verificationToken`](#verification-request) endpoint, where we will search for a user in the `User` model by the `verificationToken` parameter.
- If user with such token is not found, return [Error 'Not Found'](#verification-user-not-found)
- If the user is found - set `verificationToken` to `null`, and set the `verify` field to `true` in the user document and return [Successful response](#verification-success-response)

### Verification Request

```shell
GET /users/verify/:verificationToken
```

### Verification User Not Found

```shell
Status: 404 Not Found
ResponseBody: {
  message: 'User not found'
}
```

### Verification Success Response

```shell
Status: 200 OK
ResponseBody: {
  message: 'Verification successful',
}
```

## Step 3

### Adding an Email to the User with a Verificaton Link

When creating a user during registration:

- Create a `verificationToken` for the user and write it to the database (to generate a token, use the package [uuid](https://www.npmjs.com/package/uuid) or [nanoid](https://www.npmjs.com /package/nanoid))
- Send an email to the user's mail and specify a link to verify the email (`/users/verify/:verificationToken`) in the message
- It is also necessary to take into account that now the user login is not allowed with an unverified email

## Step 4

### Adding a Resend Email to the User with a Verification Link

It is necessary to provide for the option that the user can accidentally delete the letter. It may not reach the addressee for some reason. Our service for sending letters during registration gave an error, etc.

#### @ POST /users/verify/

- Gets `body` in `{ email }` format
- If there is no required field `email` in `body`, returns JSON with key `{"message": "missing required field email"}` and status `400`
- If everything is fine with `body`, resend the letter with `verificationToken` to the specified email, but only if the user is not verified
- If the user has already passed verification, send json with the key `{ message: "Verification has already been passed"}` with status `400 Bad Request`

#### Resending an Email Request

```shell
POST /users/verify
Content-Type: application/json
RequestBody: {
  "email": "example@example.com"
}
```

#### Resending an Email Validation Error

```shell
Status: 400 Bad Request
Content-Type: application/json
ResponseBody: <Error from Joi or another validation library>
```

#### Resending an Email Success Response

```shell
Status: 200 Ok
Content-Type: application/json
ResponseBody: {
  "message": "Verification email sent"
}
```

#### Resend Email for Verified User

```shell
Status: 400 Bad Request
Content-Type: application/json
ResponseBody: {
  message: "Verification has already been passed"
}
```

> Note: As an alternative to SendGrid, you can use the [nodemailer] package(https://www.npmjs.com/package/nodemailer)

## Additional Task - Optional

### 1. Write a dockerfile for your application
