const express = require('express')
const fileSystem = require('fs')
const cors = require("cors")
const app = express()
const port = 3000

app.use(cors())
app.use(express.json())

app.use(express.static('backend'))

app.get('/api/pizza', (req, res) => {

    //const searchParam = req.query.filter

    const data = fileSystem.readFileSync(__dirname + '/api/pizza/pizza.json')
    const pizzas = JSON.parse(data)

    res.json(pizzas)
})

app.post('/api/orders', (req, res) => {
    const data = fileSystem.readFileSync(__dirname + '/api/orders/orders.json')
    const orders = JSON.parse(data)
    const lastOrder = orders[orders.length-1]
      
    const orderDate = req.body.orderDate
    const orderedItems = req.body.pizza
    const name = req.body.name
    const street = req.body.street
    const houseNumber = req.body.houseNumber
    const city = req.body.city
    const zipCode = req.body.zipCode
    const mobile = req.body.mobile
    const email = req.body.email

    const newOrders = {
        "id" : Object.values(lastOrder)[0] + 1,
        "orderDate": orderDate,
        "orderedItems": orderedItems,
        "name": name,
        "street": street,
        "houseNumber": houseNumber,
        "city": city,
        "zipCode": zipCode,
        "mobile": mobile,
        "email": email
      }

    orders.push(newOrders)
    const newData = JSON.stringify(orders)
    fileSystem.writeFileSync(__dirname + '/api/orders/orders.json', newData)

    res.sendStatus(204)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})