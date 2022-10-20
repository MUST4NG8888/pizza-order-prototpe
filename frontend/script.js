const nameInput = document.getElementById("name");
const streetInput = document.getElementById("street");
const houseNumberInput = document.getElementById("houseNumber");
const cityInput = document.getElementById("city");
const zipCodeInput = document.getElementById("zipCode");
const mobileInput = document.getElementById("mobile");
const emailInput = document.getElementById("email");


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
    pizzaButton.innerText = "PIZZA"
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
  console.log(appState);
  pizzaImg.src = `http://127.0.0.1:3000${appState.pizza[a].picture}`;

  pizzaRight.append(pizzaImg);

  let pizzaName = document.createElement("h1");
  pizzaLeft.append(pizzaName);
  pizzaName.innerText = appState.pizza[a].name;
  let pizzaToppings = document.createElement("h3");
  pizzaLeft.append(pizzaToppings);
  pizzaToppings.innerText = appState.pizza[a].toppings;
  const amountInput = document.createElement("input");
  amountInput.type = "number";
  amountInput.placeholder = "Amount";
  pizzaLeft.append(amountInput);
  const mainButton = document.createElement("button");
  pizzaLeft.append(mainButton);
  mainButton.value = 0;
  mainButton.innerText = "Add to Basket";
};

const request = async () => {
  const response = await fetch(`http://localhost:3000/api/pizza`);
  const data = await response.json();
  appState.pizza = data;
};

const start = async () => {
  await request();
  pizzaLoader(1);
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

  let chosenPizza = [
    {
      id: 4,
      name: "Margareta",
      amount: 2,
    },
    {
      id: 5,
      name: "Margareta",
      amount: 24,
    },
    {
      id: 64,
      name: "Margareta",
      amount: 23,
    },
  ];

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
