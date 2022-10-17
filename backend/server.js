const express = require('express')
const fileSystem = require('fs')
const cors = require("cors")
const app = express()
const port = 3000

app.use(cors())
app.use(express.json())

app.get('/api/pizza', (req, res) => {

    const searchParam = req.query.filter

    const data = fileSystem.readFileSync("./database.json")
    const recipes = JSON.parse(data)

    if (searchParam) {
        return res.json(recipes.filter(recipe => recipe.title.includes(searchParam)))
    }

    res.json(recipes)
})

app.post('/api/orders', (req, res) => {
  
    const id = req.body.id
    const orderDate = req.body.orderDate
    const pizza = req.body.pizza
    const name = req.body.name
    const street = req.body.street
    const houseNumber = req.body.houseNumber
    const city = req.body.city
    const zipCode = req.body.zipCode
    const mobile = req.body.mobile
    const email = req.body.email
  
    const data = fileSystem.readFileSync(__dirname + "./orders.json")
    const orders = JSON.parse(data)
    const lastOrder = orders[orders.length-1]

    const newOrders = {
        "id" : Object.values(lastOrder)[0] + 1,
        "orderDate": "2022-10-17",
        "pizza": {"id" : 1, "name": "Margarita", "amount": 3},
        "name": "Béla",
        "street": "Bajcsy",
        "houseNumber": "8",
        "city": "Budapest",
        "zipCode": "1057",
        "mobile": "+36307777777",
        "email": "pizzaforever2@gmail.com"
      }

  
    orders.push(newOrders)
    const newData = JSON.stringify(orders)
    fileSystem.writeFileSync(__dirname + "./orders.json", newData)

    res.sendStatus(204)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})