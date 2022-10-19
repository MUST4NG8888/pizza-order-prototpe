const express = require("express");
const fileSystem = require("fs");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.use("/images", express.static(__dirname + "/api/pizza/images"));

app.get("/api/pizza", (req, res) => {
  const data = fileSystem.readFileSync(__dirname + "/api/pizza/pizza.json");
  const pizzas = JSON.parse(data);

  res.json(pizzas);
});

app.post("/api/orders", (req, res) => {
  const data = fileSystem.readFileSync(__dirname + "/api/orders/orders1.json");
  const orders = JSON.parse(data);
  const files = fileSystem.readdirSync(__dirname + "/api/orders/");
  console.log(files);

  const currentOrder = [];
  // const lastOrder = orders[orders.length-1]
  const lastOrder = files[files.length - 1];
  const r = /\d+/g;
  const lastOrderNumberStr = lastOrder.match(r);
  const lastOrderNumber = Number(lastOrderNumberStr[0]);

  const orderDate = req.body.orderDate;
  const orderedItems = req.body.pizza;
  const name = req.body.name;
  const street = req.body.street;
  const houseNumber = req.body.houseNumber;
  const city = req.body.city;
  const zipCode = req.body.zipCode;
  const mobile = req.body.mobile;
  const email = req.body.email;

  const newOrders = {
    id: lastOrderNumber + 1,
    orderDate: orderDate,
    orderedItems: orderedItems,
    name: name,
    street: street,
    houseNumber: houseNumber,
    city: city,
    zipCode: zipCode,
    mobile: mobile,
    email: email,
  };

  currentOrder.push(newOrders);
  const newData = JSON.stringify(currentOrder);
  fileSystem.writeFileSync(
    __dirname + `/api/orders/orders${lastOrderNumber + 1}.json`,
    newData
  );

  res.sendStatus(204);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
