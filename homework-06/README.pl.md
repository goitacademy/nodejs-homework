**Czytaj w innych językach: [rosyjski](README.md), [ukraiński](README.ua.md).**

# Домашнее задание 6 Zadanie domowe 6

Создай ветку `hw06-email` из ветки `master`.
Utwórz gałąź `hw06-email` z gałęzi `master`.

Продолжаем создание REST API для работы с коллекцией контактов. Добавьте верификацию email пользователя после регистрации при помощи сервиса [SendGrid](https://sendgrid.com/).

Kontynuujemy tworzenie REST API pracy ze zbiorem kontaktów. Dodaj weryfikację emaila użytkownika po rejestracji przy pomocy serwisu [SendGrid](https://sendgrid.com/).

## Как процесс верификации должен работать
Jak powinien działać proces weryfikacji

1. После регистрации, пользователь должен получить письмо на указанную при регистрации почту с ссылкой для верификации своего email
Po rejestracji użytkownik powinien otrzymać wiadomość na wskazaną przy rejestracji pocztę z odnośnikiem do weryfikacji swojego emaila.
3. Пройдя ссылке в полученном письме, в первый раз, пользователь должен получить [Ответ со статусом 200](#verification-success-response), что будет подразумевать успешную верификацию email
Przechodząc do odnośnika w otrzymanej woadomości po raz pierwszy, użytkownik powinien otrzymać [Odpowiedź ze statusem 200](#verification-success-response), co będzie oznaczać pomyślną weryfikację emaila.
5. Пройдя по ссылке повторно пользователь должен получить [Ошибку со статусом 404](#verification-user-not-found)
Przechodząc po odnośniku powtórnie użytkownik powinien otrzymać [Błąd ze statusem 404](#verification-user-not-found).

## Шаг 1 Krok 1

### Подготовка интеграции с SendGrid API
Przygotowanie integracji z SendGrid API

- Зарегистрируйся на [SendGrid](https://sendgrid.com/).
Zarejestruj się na [SendGrid](https://sendgrid.com/).
- Создай email-отправителя. Для это в административной панели SendGrid зайдите в меню Marketing в подменю senders и в правом верхнем углу нажмите кнопку "Create New Sender". Заполните необходимые поля в предложенной форме. Сохраните. Должен получится следующий как на картинке результат, только с вашим email:
Utwórz email nadawcy. W tym celu w panelu administratora SendGrid przejdź do menu Marketing w podmenu senders i w prawym górnym rogu wciśnij przycisk "Create New Sender".

![sender](sender-not-verify.png)

На указанный email должно прийти письмо верификации (проверьте спам если не видите письма). Кликните на ссылку в нем и завершите процесс. Результат должен изменится на:
Na wskazany email powinna przyjść wiadomość weryfikacyjna (sprawdź spam, jeśli nie widzisz wiadomości). Kliknij na odnośnik w nim i zakończ proces. Wynik powinien zmienić się na:

![sender](sender-verify.png)

- Теперь необходимо создать API токен доступа. Выбираем меню "Email API", и подменю "Integration Guide". Здесь выбираем "Web API"
Teraz należy utworzyć API token dostępu. Wybieramy menu "Email API" i podmenu "Integration Guide". Tutaj wybieramy "Web API".

![api-key](web-api.png)

Дальше необходимо выбрать технологию Node.js
Dalej należy wybrać technologię Node.js.

![api-key](node.png)

На третьем шаге даем имя нашему токену. Например systemcats, нажимаем кнопку сгенерировать и получаем результат как на скриншоте ниже. Необходимо скопировать этот токен (это важно, так как больше вы не сможете его посмотреть). После завершить процесс создания токена

W trzecim kroku nazywamy nasz token, na przykład systemcats. Klikamy na przycisk "wygeneruj" i otrzymujemy wynik jak na screenshocie niżej. Należy skopiować ten token (to ważne, ponieważ więcej nie możesz go zobaczyć). Następnie zakończ proces tworzenia tokena.

![api-key](api-key.png)

- Полученный API-токен надо добавить в `.env` файл в нашем проекте
- Otrzymany token API należy dodać do pliku `.env` w naszym projekcie.

## Шаг 2 Krok 2

### Создание ендпоинта для верификации email'а Utworzenie endpointu dla weryfikacji emaila

- добавить в модель `User` два поля `verificationToken` и `verify`. Значение поля `verify` равное `false` будет означать, что его email еще не прошел верификацию 
- dodaj do modelu `User` dwa pola `verificationToken` i `verify`. Wartość pola `verify` równa `false` będzie oznaczać, że jego email jeszcze nie przeszedł weryfikacji.

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

- создать эндпоинт GET [`/users/verify/:verificationToken`](#verification-request), где по параметру `verificationToken` мы будем искать пользователя в модели `User`
utwórz endpoint GET [`/users/verify/:verificationToken`](#verification-request), gdzie w parametrze `verificationToken` będziemy szukać użytkownika w modelu `User`;
- если пользователь с таким токеном не найден, необходимо вернуть [Ошибку 'Not Found'](#verification-user-not-found)
jeśli użytkownik z takim tokenem nie zostanie znaleziony, należy zwrócić [Błąd 'Not Found'](#verification-user-not-found);
- если пользователь найден - устанавливаем `verificationToken` в `null`, а поле `verify` ставим равным `true` в документе пользователя и возвращаем [Успешный ответ](#verification-success-response)
jeśli użytkownik został odnaleziony – ustawiamy `verificationToken` na `null`, a pole `verify` ustawiamy jako równe `true` w dokumencie użytkownika zwracamy [Sukces odpowidzi](#verification-success-response).

### Verification request

```shell
GET /auth/verify/:verificationToken
```

### Verification user Not Found

```shell
Status: 404 Not Found
ResponseBody: {
  message: 'User not found'
}
```

### Verification success response

```shell
Status: 200 OK
ResponseBody: {
  message: 'Verification successful',
}
```

## Шаг 3 Krok 3

### Добавление отправки email пользователю с ссылкой для верификации
Dodanie wysłania emaila do użytkownika z odnośnikiem dla weryfikacji

При создания пользователя при регистрации:
Podczas tworzenia użytkownika przy rejestracji:

- создать `verificationToken` для пользователя и записать его в БД (для генерации токена используйте пакет [uuid](https://www.npmjs.com/package/uuid) или [nanoid](https://www.npmjs.com/package/nanoid))
utworzyć `verificationToken` dla użytkownika i zapisać go w bazie danych (do wygenerowania tokena wykorzystaj pakiet [uuid](https://www.npmjs.com/package/uuid) lub [nanoid](https://www.npmjs.com/package/nanoid));
- отправить email на почту пользователя и указать ссылку для верификации email'а (`/users/verify/:verificationToken`) в сообщении
wysłać email na pocztę użytkownika i wskazać odnośnik do weryfikacji emaila (`/users/verify/:verificationToken`) w wiadomości;
- Так же необходимо учитывать, что теперь логин пользователя не разрешен при не верифицированном email
należy wziąć pod uwagę, że teraz login użytkownika nie jest dozwolony przy nieweryfikowanym emailu.

## Шаг 4 Krok 4

### Добавление повторной отправки email пользователю с ссылкой для верификации
Dodanie powtórnego wysłania emaila do użytkownika z odnośnikiem do weryfikacji

Необходимо предусмотреть, вариант, что пользователь может случайно удалить письмо. Оно может не дойти по какой-то причине к адресату. Наш сервис отправки писем во время регистрации выдал ошибку и т.д.

Należy przewidzieć wariant, że użytkownik może po prostu usunąć wiadomość. Z jakiejś przyczyna może ona nie dojść do adresata. Nasz serwis wysyłania wiadomości w czasie rejestracji wyświetlił błąd i tak dalej.

#### @ POST /users/verify/

- Получает `body` в формате `{ email }`
- Otrzymuje `body` w formacie `{ email }`;
- Если в `body` нет обязательного поля `email`, возвращает json с ключом `{"message": "missing required field email"}` и статусом `400`
- Jeśli w `body` nie ma obowiązkowego pola `email`, zwraca json z kluczem `{"message": "missing required field email"}` i statusem `400`; 
- Если с `body` все хорошо, выполняем повторную отправку письма с `verificationToken` на указанный email, но только если пользователь не верифицирован
- Jeśli z `body` wszystko w porządku, wykonujemy ponownie wysłanie wiadomości z `verificationToken` na wskazany email, ale tylko jeśli użytkownik nie został zweryfikowany;
- Если пользователь уже прошел верификацию отправить json с ключом `{ message: "Verification has already been passed"}` со статусом `400 Bad Request`
- Jeżeli użytkownik przeszedł już weryfikację, wysłać json z kluczem `{ message: "Verification has already been passed"}` ze statusem `400 Bad Request`.

#### Resending a email request

```shell
POST /users/verify
Content-Type: application/json
RequestBody: {
  "email": "example@example.com"
}
```

#### Resending a email validation error

```shell
Status: 400 Bad Request
Content-Type: application/json
ResponseBody: <Ошибка от Joi или другой библиотеки валидации> Błąd od Joi lub innej biblioteki walidacji
```

#### Resending a email success response

```shell
Status: 200 Ok
Content-Type: application/json
ResponseBody: {
  "message": "Verification email sent"
}
```

#### Resend email for verified user

```shell
Status: 400 Bad Request
Content-Type: application/json
ResponseBody: {
  message: "Verification has already been passed"
}
```

> Примечание: Как альтернативу SendGrid можно использовать пакет [nodemailer](https://www.npmjs.com/package/nodemailer)
Uwaga: Jako alternatywę SendGrid można wykorzystać pakiet [nodemailer](https://www.npmjs.com/package/nodemailer).

## Дополнительное задание - необязательное
Zadanie dodatkowe – nieobowiązkowe

### 1. Напишите dockerfile для вашего приложения
Napisz dockerfile dla twojej aplikacji

