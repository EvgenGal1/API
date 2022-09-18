<h1>Изучение API</h1>
<h2>Fetch API</h2>
<p>Fetch API - интерфейс JS для создания серверных запросов (запросы и ответы HTTP) с промисам.</p>
<p>Метод <b>fetch()</b> принимает/передаёт данные между страницей браузера и веб-сервером и возвращает <span>Promise</span></p>

Ситнаксис

```js
fetch(url, [options]);
```

`url` – URL, на который сделать запрос (строка/строк.выраж.)<br>
`options` – доп. объ., с настройками запроса (без `options` метод GET(получить данные))

Пример простого запроса GET:

```js
fetch("http://example.com/api/users");
```

Результат вызова возвращает спец.объ.хран.сост. `Promise`(обещание). При получении ответа, выполняются коллбэки с объ.встроен.класса `Response`(Ответ)

<hr>
<h3>Получение ответа</h3>

`Promise` выполняется с объектом встроенного класса `Response` в качестве результата, как только сервер пришлёт заголовки ответа.

Объект `Response`(Ответ), через свои методы, предоставляет доступ по двум этапам:

Заголовки (проверки):<br>

- `response.status`- код статуса HTTP-запроса // 200|404|500|...
- `response.ok` - успешность // ok/true(200-299)|...
- `response.headers.get('Content-Type')` - заголовок, объ. похож на Map с такими же методами

Тело (форматы):<br>

- `response.text()` – читает ответ и возвращает как обычный текст,
- `response.json()` – декодирует ответ в формате JSON,
- `response.formData()` – возвращает ответ как объект FormData (кодировка form/multipart),
- `response.blob()` – возвращает объект как Blob (бинарные данные с типом),
- `response.arrayBuffer()` – возвращает ответ как ArrayBuffer (низкоуровневое представление бинарных данных),
- `response.body` – это объект `ReadableStream`, с помощью которого можно считывать тело запроса по частям.

Используется только один метод для обработки ответа. Др. приведет к ошибке.

<hr>
<h3>Для работы с <b>Promise</и> в JavaScript есть два способа - <b>then/catch</b> и <b>async/await</b></h3>

`then/catch`

- `then` - метод для навешивая обработчиков на `Promise`
- `catch` - метод для обработки ошибок в `Promise` вместе с `then`

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

`async/await`

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

В данном примере для обработки ошибок идет проверка на состояние объекта `Response`.<br>
Для работы с ошибками в async/await существует более эстетичное решение с использованием конструкции `try..catch`

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

<hr>
<h3>Options. Отправка данных на сервер</h3>

Для отправки POST/других запросов, необходимо в `options` указать параметры/ Наиболее частые:

- `method` – HTTP метод запроса // GET|POST|PUT|DELETE
- `headers` — заголовки запроса. Зависит от тела запроса и обычно ставится автоматически.
- `body` – тело запроса // FormData|BufferSource|URLSearchParams|string|Blob|ArrayBuffer|TypedArray|DataView
- `mode` - защита от отправки запросов на другой сервер // cors|no-cors|same-origin
- `credentials` - указ методу по учёт.данным в запросе (куки,заголовок авторизации) // omit|same-origin|include
- `cache` - кеширование запроса // default|no-store|reload|no-cache|force-cache|only-if-cached
- `redirect` - обработка перенаправлений // follow|error|manual

Пример отправит объ. `user` как JSON:

```js
let user = {
  name: "John",
  surname: "Smith",
};

let response = await fetch("/article/fetch/post/user", {
  method: "POST",
  headers: {
    "Content-Type": "application/json;charset=utf-8",
  },
  body: JSON.stringify(user),
});

let result = await response.json();
alert(result.message);
```

Заметим, что так как тело запроса body – строка, то заголовок `Content-Type` по умолчанию будет text/plain;charset=UTF-8.

Но, так как мы посылаем JSON, то используем параметр headers для отправки вместо этого `application/json`, правильный Content-Type для JSON.

<hr>
<h3>Тонкости в DevTools</h3>

<h4>Network</h4>

В `DevTools` вкладка `Network` отражает раб. с сервером - загружаемые/переданые данные/файлы, время загрузок, ...
<br>
Е/и выбрать файл то покажут подвкладки:

- `Headers` - заголовки по запросу (url, метод, код статуса, IP адрес, ресурс пользователя, содержимое, куки, тело и пр.)
- `Prewiew` - Предварительный просмотр ответа с сервера
- `Response` - ответ сервера тектом
- `Timing` - параметры времяни по запросу
  <br>
  Коды статуса: 100 - информационные, 200 - успешные, 300 - перенаправление, 400 - ошибка клиента, 500 - ошибка сервера

<h4>Неиспользуемый код</h4>

Неиспользуемые код CSS и JS в вёрстке - https://fuse8.ru/articles/interesting-devtools-features-for-qa
Откр. DevTools(панель разраб.)
<br>
Вызов Command Menu(Ctrl+Shift+P) - ввод Show Coverage - Enter
<br>
Откр. вклад. Coverage - кнп. Start instrumenting coverage and reload page|Click the reload button - вывод использ. код
<br>
Выбор файла/блока - красным отмечен не используемый код.

<hr>
Более подробную инфу можно прочитать по ссылкам:
<br>
https://learn.javascript.ru/fetch
<br>
https://developer.mozilla.org/ru/docs/Web/API/Fetch_API/Using_Fetch
