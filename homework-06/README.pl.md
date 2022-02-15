**Czytaj w innych językach: [rosyjski](README.md), [ukraiński](README.ua.md).**

# Zadanie domowe 6

Utwórz gałąź `hw06-email` z gałęzi `master`.

Kontynuujemy tworzenie REST API pracy ze zbiorem kontaktów. Dodaj weryfikację emaila użytkownika po rejestracji przy pomocy serwisu [SendGrid](https://sendgrid.com/).

## Jak powinien działać proces weryfikacji

1. Po rejestracji użytkownik powinien otrzymać wiadomość na wskazaną przy rejestracji pocztę z odnośnikiem do weryfikacji swojego emaila.
2. Przechodząc do odnośnika w otrzymanej wiadomości po raz pierwszy, użytkownik powinien otrzymać [Odpowiedź ze statusem 200](#verification-success-response), co będzie oznaczać pomyślną weryfikację emaila.
3. Przechodząc po odnośniku powtórnie użytkownik powinien otrzymać [Błąd ze statusem 404](#verification-user-not-found).

## Krok 1

### Przygotowanie integracji z SendGrid API

- Zarejestruj się na [SendGrid](https://sendgrid.com/).
- Utwórz email nadawcy. W tym celu w panelu administratora SendGrid przejdź do menu Marketing w podmenu senders i w prawym górnym rogu wciśnij przycisk "Create New Sender". Uzupełnij wymagane pola w dołączonym formularzu. Zapisz. Rezultat powinien wyglądać jak na obrazku, tylko z twoim adresem email:

![sender](sender-not-verify.png)

Na wskazany email powinna przyjść wiadomość weryfikacyjna (sprawdź spam, jeśli nie widzisz wiadomości). Kliknij na odnośnik w niej i zakończ proces. Wynik powinien zmienić się na:

![sender](sender-verify.png)

- Teraz należy utworzyć API token dostępu. Wybieramy menu "Email API" i podmenu "Integration Guide". Tutaj wybieramy "Web API".

![api-key](web-api.png)

Dalej należy wybrać technologię Node.js.

![api-key](node.png)

W trzecim kroku nazywamy nasz token, na przykład systemcats. Klikamy na przycisk "wygeneruj" i otrzymujemy wynik jak na zrzucie ekranu niżej. Należy skopiować ten token (to ważne, ponieważ więcej nie możesz go zobaczyć). Następnie zakończ proces tworzenia tokena.

![api-key](api-key.png)

- Otrzymany token API należy dodać do pliku `.env` w naszym projekcie.

## Krok 2

### Utworzenie endpointu dla weryfikacji emaila

- Dodaj do modelu `User` dwa pola `verificationToken` i `verify`. Wartość pola `verify` równa `false` będzie oznaczać, że email jeszcze nie przeszedł weryfikacji.

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

- Utwórz endpoint GET [`/users/verify/:verificationToken`](#verification-request), gdzie w parametrze `verificationToken` będziemy szukać użytkownika w modelu `User`;
- jeśli użytkownik z takim tokenem nie zostanie znaleziony, należy zwrócić [Błąd 'Not Found'](#verification-user-not-found);
- jeśli użytkownik został odnaleziony – ustawiamy `verificationToken` na `null`, a pole `verify` ustawiamy jako równe `true` w dokumencie użytkownika zwracamy [Sukces odpowiedzi](#verification-success-response).

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

## Krok 3

### Dodanie wysłania emaila do użytkownika z odnośnikiem dla weryfikacji

Podczas tworzenia użytkownika przy rejestracji:

- utworzyć `verificationToken` dla użytkownika i zapisać go w bazie danych (do wygenerowania tokena wykorzystaj pakiet [uuid](https://www.npmjs.com/package/uuid) lub [nanoid](https://www.npmjs.com/package/nanoid));
- wysłać email na pocztę użytkownika i wskazać odnośnik do weryfikacji emaila (`/users/verify/:verificationToken`) w wiadomości;
- należy wziąć pod uwagę, że teraz login użytkownika nie jest dozwolony przy nieweryfikowanym emailu.

## Krok 4

### Dodanie powtórnego wysłania emaila do użytkownika z odnośnikiem dla weryfikacji

Należy przewidzieć wariant, że użytkownik może po prostu usunąć wiadomość, z jakiejś przyczyna może ona nie dojść do adresata albo nasz serwis wysyłania wiadomości w czasie rejestracji wyświetlił błąd i tak dalej.

#### @ POST /users/verify/

- Otrzymuje `body` w formacie `{ email }`.
- Jeśli w `body` nie ma obowiązkowego pola `email`, zwraca json z kluczem `{"message": "missing required field email"}` i statusem `400`. 
- Jeśli z `body` wszystko w porządku, wykonujemy ponownie wysłanie wiadomości z `verificationToken` na wskazany email, ale tylko jeśli użytkownik nie został zweryfikowany.
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
ResponseBody: <Błąd z Joi lub innej biblioteki walidacji> 
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

> Uwaga: Jako alternatywę SendGrid można wykorzystać pakiet [nodemailer](https://www.npmjs.com/package/nodemailer).

## Zadanie dodatkowe – nieobowiązkowe

### 1. Napisz dockerfile dla twojej aplikacji

