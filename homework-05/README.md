# Домашнее задание 5

Создай ветку `05-images` из ветки `master`.

Продолжи создание REST API для работы с коллекцией контактов. Добавь возможность
загрузки аватарки пользователя через
[Multer](https://github.com/expressjs/multer).

## Шаг 1

Создай папку `public` для раздачи статики. В этой папке сделай папку `images`.
Настрой Express на раздачу статических файлов из папки `public`.

Положи любое изображение в папку `public/images` и проверь что раздача статики
работает. При переходе по такому URL браузер отобразит изображение.

```shell
http://locahost:<порт>/images/<имя файла с расширением>
```

## Шаг 2

В схему пользователя добавь новое свойство `avatarURL` для хранения изображения.

```shell
{
  email: String,
  password: String,
  avatarURL: String,
  subscription: {
    type: String,
    enum: ["free", "pro", "premium"],
    default: "free"
  }
}
```

- Используй генератор аватарок для того чтобы при регистрации нового
  пользователя сразу сгенерить ему аватар.
- Создай папку `tmp` в корне проекта и сохраняй в неё созданную аватарку.

## Шаг 3

При регистрации пользователя:

- Создавай изображение испопользуя генератор аватарок из шага 2
- Перенеси аватар из папки `tmp` в папку `public/images`
- Создай URL для аватара. Например
  `http://locahost:3000/images/<имя файла с расширением>`
- Сохрани созданный URL в поле `avatarURL` во время создания пользователя

## Шаг 4

Добавь возможность обновления данных уже созданного пользователя, в том числе
аватарки.

![avatar upload from postman](./avatar-upload.png)

```shell
# Запрос
PATCH /users/avatars
Content-Type: multipart/form-data
Authorization: "Bearer token"
RequestBody: загруженный файл

# Успешный ответ
Status: 200 OK
Content-Type: application/json
ResponseBody: {
  "avatarURL": "тут будет ссылка на изображение"
}

# Неуспешный ответ
Status: 401 BAD
Content-Type: application/json
ResponseBody: {
  "message": "Not authorized"
}
```
