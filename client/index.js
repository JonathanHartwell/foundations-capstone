const baseURL = 'http://localhost:5896'


const displayRecipes = document.querySelector('#recipeDisplay')
const addNewRecipe = document.querySelector('#submitRecipe')
const addIngredient = document.querySelector('#addIngredient')
const ingredient = document.querySelector('#ingredientInput')
const ingredientList = document.querySelector(`#ingredientList`)
const stepInput= document.querySelector('#directionsInput')
const stepList = document.querySelector('#directionsList')
const submitStep = document.querySelector('#addStep')
const recipeCards = document.querySelector('.recipe-card')
const addRecipeLink = document.querySelector('#addRecipeLink')
const recipeSect = document.querySelector('#recipeSect')





const createRecipeCard = (recipe) => {

    const newRecipeCard = document.createElement('section')
    newRecipeCard.classList.add('recipe-card')

    newRecipeCard.innerHTML = `
    <div>
    <img onclick="createRecipeDisplay(${recipe.id})" class="cardpic" alt='recipe picture' src='${recipe.picture}'/>
    </div>
    <p>${recipe.name}</p>

    <section>
        <button onclick="updateRecipe(${recipe.id}, 'dislike')">Dislike</button>
        YumMeter: ${recipe.score}
        <button onclick="updateRecipe(${recipe.id}, 'like')">Like</button>
    </section>
    <button onclick="deleteRecipe(${recipe.id})">Delete Recipe</button>
    <p class="hidden"></p>
    `

    displayRecipes.appendChild(newRecipeCard)
}


const createRecipeDisplay = (id) => {

    axios.get(`${baseURL}/recipes/${id}`)
        .then((res) => {
            console.log(res.data)
    const newRecipeDisplay = document.createElement('section')
    let totalTime = res.data.prepTime + res.data.cookTime
    newRecipeDisplay.innerHTML = `
    <section id="titleAndFavorite">
        <h2>${res.data.name}</h2> <button id="favorite">Favorite</button>
    </section>
    <section id="recipeInfo">
        <div id="timesAndServes">
            <p>Prep Time ${res.data.prepTime} Minutes</p>
            <p>Cook Time ${res.data.cookTime} Minutes</p>
            <p>Total Time ${totalTime} Minutes</p>
            <p>Servings ${res.data.serves}</p>
        </div>
        <ul>

        </ul>
        <ol>
        </ol>

    </section>
    `
    recipeSect.appendChild(newRecipeDisplay)
        })

}


const showRecipes = (arr) => {
    for(let i = 0; i < arr.length; i++) {
        createRecipeCard(arr[i])
    }
}



const getAllRecipes = () => {
    axios.get(`${baseURL}/recipes`)
        .then((res) => {
            console.log(res.data)
            showRecipes(res.data)
        }) 
        .catch((theseHands) => {
            console.log(theseHands)
        })
}

let ingredientArr = []

const addNewIngredient = (event) => {
    event.preventDefault();

    const ingredientsDisplay = document.createElement(`p`)
    ingredientArr.push(ingredient.value)
    ingredientList.innerHTML = `Current Ingredients: ${ingredientArr.join(', ')} `
    ingredientList.appendChild(ingredientsDisplay)
    console.log(ingredientArr)    
}

let stepsArr = []

const addNewStep = (event) => {
    event.preventDefault()

    const directionsDisplay = document.getElementById('directionsList')
    stepsArr.push(stepInput.value)
    stepList.innerHTML = stepsArr.map(i =>`<li>${i}</li>`).join("")
    // stepList.appendChild(directionsDisplay)
    console.log(stepsArr)


}
 

const addRecipe = (event) => {
    event.preventDefault();
    
    displayRecipes.innerHTML = ``

    const name = document.querySelector('#name')
    const prepTime = document.querySelector('#prepTimeInput')
    const cookTime = document.querySelector('#cookTimeInput')
    const serves = document.querySelector('#servesInput')
    // const ingredients = document.querySelector('#ingredientInput')
    const picture = document.querySelector('#pictureInput')
    // const directions = document.querySelector('#directionsInput')

    let bodyObj = {
        name: name.value,
        prepTime: prepTime.value,
        cookTime: cookTime.value,
        serves: serves.value,
        ingredients: ingredientArr,
        picture: picture.value,
        directions: stepsArr
    }

    axios.post(`${baseURL}/recipes`, bodyObj)
        .then((res) => {
            console.log(res.data)

            showRecipes(res.data)
        })
        .catch((theseHands) => {
            console.log(theseHands)
        })

}


// const selectRecipe = (id) => {
//     axios.get(`${baseURL}/recipes/${id}`)
//         .then((res) => {
//             createRecipeDisplay(res.data)
//         })
//         .catch((theseHands) => {
//             console.log(theseHands)
//         })
// }


const deleteRecipe = (id) => {

    axios.delete(`${baseURL}/recipes/${id}`)
        .then((res) => {
            displayRecipes.innerHTML = ``
            getAllRecipes(res.data)
        })
        .catch((theseHands) => {
            console.log(theseHands)
        })

}


const updateRecipe = (id, type) => {

    let bodyObj = {
        type: type
    }

    axios.put(`${baseURL}/recipes/${id}`, bodyObj)
        .then((res) => {
            console.log(res.data)

            displayRecipes.innerHTML = ``
            getAllRecipes(res.data)
        })
        .catch((theseHands) => {
            console.log(theseHands)
        })

}

const unhideAddRecipe = () => {
    let element = document.getElementById('newRecipe')
    element.classList.remove("hidden")
}


addRecipeLink.addEventListener('click', unhideAddRecipe)
recipeCards,addEventListener('click', createRecipeDisplay)
addStep.addEventListener('click', addNewStep)
addIngredient.addEventListener('click', addNewIngredient)
addNewRecipe.addEventListener('click', addRecipe)
getAllRecipes()