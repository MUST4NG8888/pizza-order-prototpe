const nameInput = document.getElementById("name")
const streetInput = document.getElementById("street")
const houseNumberInput = document.getElementById("houseNumber")
const cityInput = document.getElementById("city")
const zipCodeInput = document.getElementById("zipCode")
const mobileInput = document.getElementById("mobile")
const emailInput = document.getElementById("email")


let request = async () => {
    let response = await fetch(`http://localhost:3000/api/pizza`)
    let pizza = await response.json()


    const pizzaLoader = () => {
        let pizzaContainer = document.getElementById("pizzaContainer");
        for(let i = 0; i < pizza.length; i++){

            
            let pizzaBox = document.createElement("div")
            pizzaBox.id = "pizza_" + (i+1)
            pizzaContainer.append(pizzaBox); 
            let pizzaLeft = document.createElement("div")
            pizzaLeft.id = "pizza_left"
            let pizzaRight = document.createElement("div")
            pizzaRight.id = "pizza_right"
            pizzaBox.append(pizzaLeft)
            pizzaBox.append(pizzaRight)

            let pizzaImg = document.createElement("img")
            pizzaImg.id = "pizza_img" + (i+1);

            let pizzaPath = path.join(__dirname, '..', '', 'karma.conf.js')

            pizzaImg.src = `${pizzaPath}` 
            
            pizzaRight.append(pizzaImg);

            let pizzaName = document.createElement("h3")
            pizzaLeft.append(pizzaName);
            let pizzaToppings = document.createElement("h5")
            pizzaLeft.append(pizzaToppings) 
            
            console.log("cica");
        }
    }
    pizzaLoader()
}



const postOrder = async (date, pizza, name, street, houseNumber, city, zipcode, mobile, email) => {
    const url = "http://localhost:3000/api/orders"
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({date, pizza, name, street, houseNumber, city, zipcode, mobile, email})
    })
    return response.status
}




const resetForm = () => {
    nameInput.value = ""
    streetInput.value = ""
    houseNumberInput.value = null
    cityInput.value = ""
    zipCodeInput.value = null
    mobileInput.value = null
    emailInput.value = ""
}


const makeOrder = async (date, pizza, name, street, houseNumber, city, zipcode, mobile, email) => {
    const resStatus = await postOrder(date, pizza, name, street, houseNumber, city, zipcode, mobile, email)
    if (resStatus === 204) {
        alert("Thanks for your love of Pizza!")
        resetForm()
        console.log("kettes szint");
    } else {
        alert("Something goes wrong")
    }
}

const getOrderInput = async () => {
    let orderName = nameInput.value;

    let chosenPizza = [{
        'id' : 4,
        'name' : "Margareta",
        'amount' : 2
    }, {
        'id' : 5,
        'name' : "Margareta",
        'amount' : 24
    }, {
        'id' : 64,
        'name' : "Margareta",
        'amount' : 23
    }]
    
    let orderStreet = streetInput.value;
    let orderHouseNumber = houseNumberInput.value;
    let orderCity = cityInput.value;
    let orderZipCode = zipCodeInput.value;
    let orderMobile = mobileInput.value;
    let orderEmail = emailInput.value;

    
    let Today = new Date();
    var date = Today.getFullYear()+'-'+(Today.getMonth()+1)+'-'+Today.getDate() + ' ' + Today.getHours() + ':' + Today.getMinutes() + ":" + Today.getSeconds();
    console.log(date)
    
    console.log("egyes szint");
    await makeOrder(date, chosenPizza , orderName, orderStreet, orderHouseNumber, orderCity, orderZipCode, orderMobile, orderEmail);
}

request ();





    //addButton.addEventListener("click", createRecipe)
    //document.getElementById("random").addEventListener("click", () => console.log("random"))
    

const ourButton = document.getElementById("orderButton")
ourButton.addEventListener("click", getOrderInput);
   
