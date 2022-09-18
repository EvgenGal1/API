// вызов метода fetch (получаем данные) с цепочкой методов (then) дальнейших действий с ответом
fetch(
  "https://mdn.github.io/learning-area/javascript/oojs/json/superheroes.json"
)
  // .then((response) => console.log(response));
  .then((response) => response.json())
  // .then((data) => console.log(data));
  .then((data) => setHeroes(data));

// fn. по отрисовке, приним. данные из запроса, вызов в .then
let main = document.getElementById("main");
function setHeroes({ squadName, homeTown, formed, members }) {
  // встав. после начала body
  // document.body.main.insertAdjacentHTML(
  main.insertAdjacentHTML(
    "afterbegin",
    `
    <h1>${squadName}</h1>
    <h2>HomeTown:${homeTown}  // Formed ${formed}</h2>
    <div class="heroes">${setMembers(members)}</div>
    `
    // в div.heroes использ доп.fn()setMembers для перебора массива
  );
}

// fn. перебора массива. приним. массив members, возвращ.
function setMembers(members) {
  // обходим массив ч/з map, получ каждого hero, у каждого hero полученные параметры распред по html
  // ^ лишние запятые - перебор массива ч/з map разделяет данные запятыми. чтоб их убрать, превращаем результат в строку - .join(' ') в конце map
  return members
    .map(
      (hero) =>
        `
    <div>
    <h3>${hero.name}</h3>
    <p>Тайная идентичность: ${hero.age}</p>
    <p>Возраст: ${hero.secretIdentity}</p>
    <p>Супер сила:</p>
    <ul>
      ${hero.powers.map((power) => `<li>${power}</li>`).join(" ")}
    </ul>
    </div>
    `
      // перебор в ul можно вынести в отделн. fn.
    )
    .join(" ");
}
