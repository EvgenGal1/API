<h1>Fetch API интерфейс JS для создания серверных запросов (запросы и ответы HTTP) с промисам.</h1>
<p>Метод `fetch()` принимает/передаёт данные между страницей браузера и веб-сервером и возвращает `Promise`</p>

Ситнаксис

```js
fetch(url, [options]);
```

`url` – URL, на который сделать запрос (строка/строк.выраж.)
`options` – необязательный объект с настройками запроса (по умолч. без `options` метод GET(получить данные))

Пример простого запроса GET:

```js
fetch("http://example.com/api/users");
```

Результат вызова возвращает спец.объ.хран.сост. `Promise`(обещание). При получении ответа, выполняются коллбэки с объ.встроен.класса `Response`(Ответ)

<h3>Получение ответа</h3>

`Promise` выполняется с объектом встроенного класса `Response` в качестве результата, как только сервер пришлёт заголовки ответа.

Объект `Response`(Ответ), через свои методы, предоставляет доступ по двум этапам:

Заголовки (проверки):
`response.status`- код статуса HTTP-запроса // 200|404|500|...
`response.ok` - успешность // ok/true(200-299)|...
`response.headers.get('Content-Type')` - заголовок, объ. похож на Map с такими же методами

Тело (форматы):
`response.text()` – читает ответ и возвращает как обычный текст,
`response.json()` – декодирует ответ в формате JSON,
`response.formData()` – возвращает ответ как объект FormData (кодировка form/multipart),
`response.blob()` – возвращает объект как Blob (бинарные данные с типом),
`response.arrayBuffer()` – возвращает ответ как ArrayBuffer (низкоуровневое представление бинарных данных),
`response.body` – это объект `ReadableStream`, с помощью которого можно считывать тело запроса по частям.

Используется только один метод для обработки ответа. Др. приведет к ошибке.

<h3>Для работы с `Promise` в JavaScript есть два способа:<h3>

— `then/catch`
— `async/await`

<h4>then/catch</h4>

`then` - метод для навешивая обработчиков на `Promise`
`catch` - метод для обработки ошибок в `Promise` вместе с `then`

```js
fetch("http://example.com/api/users")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.log(error);
  });
```

<h4>async/await</h4>

Более современный и лаконичный способ работы с `Promise`

```js
async function getUsers() {
  let response = await fetch("http://example.com/api/users");
  if (response.ok) {
    let data = await response.json();
    console.log(data);
    return data;
  } else {
    alert("error", response.status);
  }
}

getUsers();
```

В данном примере для обработки ошибок идет проверка на состояние объекта `Response`. Для работы с ошибками в async/await существует более эстетичное решение с использованием конструкции `try..catch`

```js
async function getUsers() {
  try {
    let response = await fetch("http://example.com/api/users");
    let users = await response.json();
    return users;
  } catch (error) {
    alert(error);
  }
}

getUsers();
```

<h3>Options. Отправка данных на сервер<h3>

Для отправки POST/других запросов, необходимо в `options` указать параметры/ Наиболее частые:
`method` – HTTP метод запроса // GET|POST|PUT|DELETE
`headers` — заголовки запроса. Зависит от тела запроса и обычно ставится автоматически.
`body` – тело запроса // FormData|BufferSource|URLSearchParams|string|Blob|ArrayBuffer|TypedArray|DataView
`mode` - защита от отправки запросов на другой сервер // cors|no-cors|same-origin
`credentials` - указ методу по учёт.данным в запросе (куки,заголовок авторизации) // omit|same-origin|include
`cache` - кеширование запроса // default|no-store|reload|no-cache|force-cache|only-if-cached
`redirect` - обработка перенаправлений // follow|error|manual

Более подробную инфу можно прочитать по ссылкам:
https://learn.javascript.ru/fetch
https://developer.mozilla.org/ru/docs/Web/API/Fetch_API/Using_Fetch
