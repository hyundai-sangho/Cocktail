let result = document.getElementById("result");
let searchBtn = document.getElementById("search-btn");
let url = "https://thecocktaildb.com/api/json/v1/1/search.php?s=";
let userInp = document.getElementById("user-inp");
let inputValue;

let getCocktailData = async () => {
  inputValue = userInp.value;

  if (inputValue.length == 0) {
    result.innerHTML = `<h3 class="msg">The input field cannot be empty</h3>`;
  } else {
    await fetch(url + inputValue)
      .then((res) => res.json())
      .then((data) => {
        let myDrink = data.drinks[0];

        let count = 1;
        let ingredients = [];
        for (let i in myDrink) {
          let ingredient = "";
          let measure = "";
          if (i.startsWith("strIngredient") && myDrink[i]) {
            ingredient = myDrink[i];
            if (myDrink["strMeasure" + count]) {
              measure = myDrink["strMeasure" + count];
            } else {
              measure = "";
            }
            count++;
            ingredients.push(`${measure} ${ingredient}`);
          }
        }
        result.innerHTML = `
        <img src=${myDrink.strDrinkThumb}></img>
        <h2>${myDrink.strDrink}</h2>
        <h3>Ingredients:</h3>
        <ul class="ingredients"></ul>
        <h3>Instructions:</h3>
        <p>${myDrink.strInstructions}</p>
        `;

        let ingredientsCon = document.querySelector(".ingredients");

        ingredients.forEach((item) => {
          let listItem = document.createElement("li");
          listItem.innerText = item;
          ingredientsCon.appendChild(listItem);
        });
      })
      .catch(() => {
        result.innerHTML = `<h3 class="msg">Please enter a valid input</h3>`;
      });
  }

  // input 창의 텍스트 제거
  userInp.value = "";
};

window.addEventListener("load", getCocktailData);

searchBtn.addEventListener("click", getCocktailData);
userInp.addEventListener("keydown", (event) => {
  if (event.key == "Enter") {
    getCocktailData();
  }
});
