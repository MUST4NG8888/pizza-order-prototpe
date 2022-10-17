const titleInput = document.getElementById("title")
const descInput = document.getElementById("description")
const pwInput = document.getElementById("password")
const addButton = document.getElementById("add")
const recipesSection = document.getElementById("recipes")



let request = async () => {
    let response = await fetch(`https://localhost:3000/api/pizza`)
    const pizzas = await response.json()
    console.log(pizzas)

}

const postOrder = async (title, description) => {
    const url = "http://localhost:3000/api/orders"
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ title, description })
    })
    return response.status
}


const resetForm = () => {
    titleInput.value = ""
    descInput.value = ""
    pwInput.value = ""
}

// const successfulOrder = async () => {
//     const recipes = await getRecipes()
//     recipesSection.innerHTML = recipes.map(recipeComponent).join("")
//     /* promiseOfRecipes.then(recipes => {
//         recipesSection.innerHTML = recipes.map(recipeComponent).join("")
//     }) */
// }

const makeOrder = async () => {
    const resStatus = await postOrder(titleInput.value, descInput.value, pwInput.value)
    if (resStatus === 204) {
        alert("Thanks for your love of Pizza!")
        resetForm()
        successfulOrder()
    } else {
        alert("Something goes wrong")
    }
}


    addButton.addEventListener("click", createRecipe)
    document.getElementById("random").addEventListener("click", () => console.log("random"))
 

