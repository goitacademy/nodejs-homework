**Читать на других языках: Czytaj w innych językach: [rosyjski](README.md), [ukraiński](README.ua.md).**

# Домашнее задание 2 Zadanie domowe 2

Создай форк [репозитория](https://github.com/goitacademy/nodejs-homework-template) в свой github аккаунт.
Utwórz fork [repozytorium](https://github.com/goitacademy/nodejs-homework-template)

Посмотри поясняющее видео как это сделать и сдавать ДЗ правильно: [<img src="./js.png" width="640">](https://www.youtube.com/watch?v=wabSW_sz_cM 'Пояснение')
Obejrzyj wideo wyjaśniające, jak to zrobić i odać pracę domową prawidłowo: [<img src="./js.png" width="640">](https://www.youtube.com/watch?v=wabSW_sz_cM 'Пояснение').

Написать REST API для работы с коллекцией контактов. Для работы с REST API используй [Postman](https://www.getpostman.com/).
Napisz REST API do pracy ze zbiorem kontaktów. Do pracy z REST API wykorzystaj [Postman](https://www.getpostman.com/).

Прочитай внимательно readme в клонированном бойлерплейте, там описан механизм сдачи домашних заданий. Приступай к выполнению ДЗ
Przeczytaj uważnie readme w sklonowanym boilerplate, opisany tam zostałm mechanizm oddawania pracy domowej. Zacznik wykonywać zadanie domowe.

## Шаг 1 Krok 1

Создай ветку `hw02-express` из ветки master.
Utwórz gałąź `hw02-express` z gałęzi master.

Установи модули командой:
Zainstluj moduł przy pomocy polecenia:

```bash
npm i
```

Следующие модули уже есть в проекте:
Następujące moduły są już w projekcie:

- [express](https://www.npmjs.com/package/express)
- [morgan](https://www.npmjs.com/package/morgan)
- [cors](https://www.npmjs.com/package/cors)

## Шаг 2 Krok 2

В app.js – веб сервер на express, добавлены прослойки `morgan` и `cors`. Начни настраивать раутинг для работы с коллекцией контактов.
W app.js – serwer webowy na express, dodane są warstwy `morgan` i `cors`. Zacznij konfigurować routing do prazy ze zbiorem kontaktów.

REST API должен поддерживать следующие рауты.
REST API powinien wspierać następujące routy:

### @ GET /api/contacts

- ничего не получает
- niczego nie otrzymuje;
- вызывает функцию `listContacts` для работы с json-файлом `contacts.json`
- wywołuje funkcję `listContacts` do pracy z plikiem json `contacts.json`;
- возвращает массив всех контактов в json-формате со статусом `200`
- zwraca tablicę wszystkich kontaktów w formacie json ze statusem `200`.

### @ GET /api/contacts/:id

- Не получает `body`
- nie otrzymuje `body`;
- Получает параметр `id`
- otrzymuje parametr `id`;
- вызывает функцию getById для работы с json-файлом contacts.json
- wywołuje funkcję getById do pracy z plikami json contacts.json;
- если такой id есть, возвращает объект контакта в json-формате со статусом `200`
- jeżeli takie id istnieje, zwraca obiekt kontaktu w formacie json ze statusem `200`;
- если такого id нет, возвращает json с ключом `"message": "Not found"` и статусом `404`
- jeżeli takiego id nie ma, zwraca json z kluczem `"message": "Not found"` i statusem `404`. 

### @ POST /api/contacts

- Получает `body` в формате `{name, email, phone}` (все поля обязательны)
- otrzymuje `body`w formacie `{name, email, phone}` (wszystkie pola są obowiązkowe);
- Если в body нет каких-то обязательных полей, возвращает json с ключом `{"message": "missing required name field"}` и статусом `400`
- jeśli w body brak jakichś obowiązkowych pól, zwraca json z kluczem `{"message": "missing required name field"}` i statusem `400`;
- Если с `body` все хорошо, добавляет уникальный идентификатор в объект контакта
- jeśli z `body` wszystko w porządku, dodaje unikalny identyfikator do obiektu kontaktu;
- Вызывает функцию `addContact(body)` для сохранения контакта в файле `contacts.json`
- wywołuje funkcję `addContact(body)` do zapisania kontaktu w pliku `contacts.json`;
- По результату работы функции возвращает объект с добавленным `id` `{id, name, email, phone}` и статусом `201`
- w rezultacie pracy funkcji zwraca obiekt z dodanymi `id` `{id, name, email, phone}` i statusem `201`.

### @ DELETE /api/contacts/:id

- Не получает `body`
- nie otrzymuje `body`;
- Получает параметр `id`
- otrzymuje parametr `id`;
- вызывает функцию `removeContact` для работы с json-файлом `contacts.json`
- wywołuje funkcję `removeContact` do pracy z plikiem json `contacts.json`;
- если такой `id` есть, возвращает json формата `{"message": "contact deleted"}` и статусом `200`
- jeżeli takie `id` istnieje, zwraca formaty json `{"message": "contact deleted"}` ze statusem `200`;
- если такого `id` нет, возвращает json с ключом `"message": "Not found"` и статусом `404`
- jeśli nie ma takiego `id`, zwraca json z kluczem `"message": "Not found"` i statusem `404`. 

### @ PUT /api/contacts/:id

- Получает параметр `id`
- otrzymuje parametr `id`; 
- Получает `body` в json-формате c обновлением любых полей `name, email и phone`
- Otrzymuje `body` w formacie json z aktualizacją dowolnych pól `name, email i phone`;
- Если `body` нет, возвращает json с ключом `{"message": "missing fields"}` и статусом `400`
- jeżeli nie ma `body`, zwraca json z kluczem `{"message": "missing fields"}` i statusem `400`;
- Если с `body` все хорошо, вызывает функцию `updateContact(contactId, body)` (напиши ее) для обновления контакта в файле `contacts.json`
- jeśli z `body` wszystko w porządku, wywołuje funkcję `updateContact(contactId, body)` (napisz ją) dla aktualizacji kontaktu w pliku `contacts.json`;
- По результату работы функции возвращает обновленный объект контакта и статусом `200`. В противном случае, возвращает json с ключом `"message": "Not found"` и статусом `404`
- w rezultacie pracy funkcji zwraca zaktualizowany obiekt kontaktu ze statusem `200`. W przecuwnym razie zwraca json z kluczem `"message": "Not found"` i statusem `404`.

## Шаг 3 Krok 3

Для маршрутов, что принимают данные (`POST` и `PUT`), продумайте проверку (валидацию) принимаемых данных. Для валидации принимаемых данных используйте пакет [joi](https://github.com/sideway/joi)

Dla tras, które przyjmują dane (`POST` i `PUT`), przemyśl sprawdzenie (walidację) przyjmowanych danych. Do walidacji wykorzystaj pakiet [joi](https://github.com/sideway/joi).

## Критерии приема дз #2-6 Kryteria zaliczenia pracy domowej #2-6

- Создан репозиторий с домашним заданием &mdash; REST API приложение
- Utworzone repozytorium z pracą domową  &mdash; aplikacja REST API.
- При создании репозитория использован [бойлерплейт](https://github.com/goitacademy/nodejs-homework-template)
- Przy utworzeniu repozytorium wykorzystuje się [boilerplate](https://github.com/goitacademy/nodejs-homework-template).
- Пулл-реквест (PR) с соответствующим дз отправлен ментору в [schoology](https://app.schoology.com/login) на проверку (ссылка на PR)
- Pull request (PR) z odpowiednią pracą domową został wysłany do mentora w [schoology](https://app.schoology.com/login) w celu sprawdzenia (odnośnik do PR).
- Код соответствует техническому заданию проекта
- Kod odpowiada technicznemu zadaniu projektu.
- При выполнении кода не возникает необработанных ошибок
- Przy wykonaniu kodu nie pojawiają się nieopracowane błędy.
- Название переменных, свойств и методов начинается со строчной буквы и записываются в нотации CamelCase. Используются английские существительные
- Nazwanie zmiennych, właściwości i metod zaczyna się z małej litery i zapisuje się w notacji CamelCase. Wykorzystywane są angielskie rzeczowniki.
- Название функции или метода содержит глагол
- Nazwanie funkcji lub metod zawiera czasownik.
- В коде нет закомментированных участков кода
- W kodzie nie ma komentarzy dodanych do fragmentów kodu.
- Проект корректно работает в актуальной LTS-версии Node
- Projekt pracuje poprawnie w aktualnej wersji LTS Node.
