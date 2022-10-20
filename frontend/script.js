const nameInput = document.getElementById("name");
const streetInput = document.getElementById("street");
const houseNumberInput = document.getElementById("houseNumber");
const cityInput = document.getElementById("city");
const zipCodeInput = document.getElementById("zipCode");
const mobileInput = document.getElementById("mobile");
const emailInput = document.getElementById("email");

let pizzaArray = [];


const appState = {
  pizza: [],
};


console
const createButtons = () => {
  for (let i = 0; i < appState.pizza.length; i++) {
    let pizzaButton = document.createElement("button");
    pizzaButtonDiv.append(pizzaButton);
    pizzaButton.className = `pizzabutton`;
    pizzaButton.id = `circle${i}`;
    let span = document.createElement("span")
    pizzaButton.append(span)
    span.innerText = "PIZZA"
    
    let gomb = document.getElementById(`circle${i}`)
    gomb.addEventListener("click", irdKi = () => {
      let pizzaName = document.getElementById("pizza_name")
      let pizzaTopping = document.getElementById("pizza_toppings")
      let pizzaImg = document.getElementById("the_only_pizza")
      if(gomb.id == `circle${i}`){
        pizzaName.innerText = appState.pizza[i].name;
        let text = "";
        for(let j = 0; j < appState.pizza[i].toppings.length; j++){
          text += appState.pizza[i].toppings[j] + ", ";
        }

        pizzaTopping.innerText = "";
        pizzaTopping.innerHTML = text;
        console.log(text)
        console.log(appState.pizza[i].toppings)

        

        let source = `http://127.0.0.1:3000${appState.pizza[i].picture}`;
        console.log(source)

        pizzaImg.src = source;
      }
    });
  }
};



const pizzaLoader = (a) => {
  let pizzaContainer = document.getElementById("pizzaContainer");
  pizzaContainer.innerHTML = "";
  let pizzaBox = document.createElement("div");
  pizzaBox.className = "pizzabox";
  pizzaContainer.append(pizzaBox);
  let pizzaLeft = document.createElement("div");
  pizzaLeft.id = "pizza_left";
  let pizzaRight = document.createElement("div");
  pizzaRight.id = "pizza_right";
  pizzaBox.append(pizzaLeft);
  pizzaBox.append(pizzaRight);
  let pizzaButtonDiv = document.createElement("div");
  document.getElementById("pizza_right").append(pizzaButtonDiv);
  pizzaButtonDiv.id = "pizzaButtonDiv"

  let pizzaImg = document.createElement("img");
  pizzaImg.className = "pizza_img";
  pizzaImg.id = "the_only_pizza";
  console.log(appState);
  pizzaImg.src = `http://127.0.0.1:3000${appState.pizza[a].picture}`;

  pizzaRight.append(pizzaImg);

  let pizzaName = document.createElement("h1");
  pizzaName.id = "pizza_name"
  pizzaLeft.append(pizzaName);
  pizzaName.innerText = appState.pizza[a].name;
  let pizzaToppings = document.createElement("h3");
  pizzaToppings.id = "pizza_toppings"
  pizzaLeft.append(pizzaToppings);
  pizzaToppings.innerText = appState.pizza[a].toppings;
  const amountInput = document.createElement("input");
  amountInput.id = "amount_input"
  amountInput.type = "number";
  amountInput.placeholder = "Amount";
  pizzaLeft.append(amountInput);
  const mainButton = document.createElement("button");
  pizzaLeft.append(mainButton);
  mainButton.id = "main_button"
  mainButton.innerText = "Add to Basket";
  document.getElementById("main_button").addEventListener("click", fillBasket = () => {
    if(document.getElementById("amount_input").value == 0 || document.getElementById("amount_input").value === undefined){
      alert("Nem jó értéket adtál meg!")
    } else {
      let rendeles = document.getElementById("pizza_name").innerText + ", darabszám: " + document.getElementById("amount_input").value + "\n"
      document.getElementById("orders").innerHTML += rendeles;
      document.getElementById("orders").innerHTML += `<br>`

      let pizza = {
        "name" : document.getElementById("pizza_name").innerText,
        "amount" : document.getElementById("amount_input").value
      }

      pizzaArray.push(pizza);

    }
  })
};

const createPizzaDesc = (a) => {
  document.getElementsByClassName("pizza_img").src = `http://127.0.0.1:3000${appState.pizza[a].picture}`;
  document.getElementsByTagName("h1").innerHTML = appState.pizza[a].name;
  document.getElementsByTagName("h3").innerHTML = appState.pizza[a].toppings; 
}

const request = async () => {
  const response = await fetch(`http://localhost:3000/api/pizza`);
  const data = await response.json();
  appState.pizza = data;
};

const start = async () => {
  await request();
  pizzaLoader(0);
  createButtons();
}

const postOrder = async (
  date,
  pizza,
  name,
  street,
  houseNumber,
  city,
  zipcode,
  mobile,
  email
) => {
  const url = "http://localhost:3000/api/orders";
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      date,
      pizza,
      name,
      street,
      houseNumber,
      city,
      zipcode,
      mobile,
      email,
    }),
  });
  return response.status;
};

const resetForm = () => {
  nameInput.value = "";
  streetInput.value = "";
  houseNumberInput.value = null;
  cityInput.value = "";
  zipCodeInput.value = null;
  mobileInput.value = null;
  emailInput.value = "";
};

const makeOrder = async (
  date,
  pizza,
  name,
  street,
  houseNumber,
  city,
  zipcode,
  mobile,
  email
) => {
  const resStatus = await postOrder(
    date,
    pizza,
    name,
    street,
    houseNumber,
    city,
    zipcode,
    mobile,
    email
  );
  if (resStatus === 204) {
    alert("Thanks for your love of Pizza!");
    resetForm();
  } else {
    alert("Something goes wrong");
  }
};

const getOrderInput = async () => {
  let orderName = nameInput.value;

  let chosenPizza = pizzaArray;

  let orderStreet = streetInput.value;
  let orderHouseNumber = houseNumberInput.value;
  let orderCity = cityInput.value;
  let orderZipCode = zipCodeInput.value;
  let orderMobile = mobileInput.value;
  let orderEmail = emailInput.value;

  let Today = new Date();
  var date =
    Today.getFullYear() +
    "-" +
    (Today.getMonth() + 1) +
    "-" +
    Today.getDate() +
    " " +
    Today.getHours() +
    ":" +
    Today.getMinutes() +
    ":" +
    Today.getSeconds();

  await makeOrder(
    date,
    chosenPizza,
    orderName,
    orderStreet,
    orderHouseNumber,
    orderCity,
    orderZipCode,
    orderMobile,
    orderEmail
  );
};

start()

const ourButton = document.getElementById("orderButton");
ourButton.addEventListener("click", getOrderInput);

function openNav() {
  document.getElementById("myNav").style.width = "100%";
}

function closeNav() {
  document.getElementById("myNav").style.width = "0%";
}

function openBasket() {
  document.getElementById("myBasket").style.width = "100%";
}

function closeBasket() {
  document.getElementById("myBasket").style.width = "0%";
}

document.getElementById("hamburger_menu").addEventListener("click", openNav);
document.getElementById("basket").addEventListener("click", openBasket);
document
  .getElementById("closebtnHamburger")
  .addEventListener("click", closeNav);
document
  .getElementById("closebtnBasket")
  .addEventListener("click", closeBasket);

// document.getElementById('0').addEventListener("click", function (e) {
//   a = e.target.value
//   pizzaLoader(a);
// });




