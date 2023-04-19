let recipes = require('./db.json')

let globalID = 3

module.exports = {
    getAllRecipes: (req, res) => {
        res.status(200).send(recipes)
    },

    getRecipeById: (req, res) => {
        const index = recipes.findIndex((el) => el.id === +req.params.id)

        

        res.status(200).send(recipes[index])
    },

    addRecipe: (req, res) => {
        const {name, prepTime, cookTime, serves, ingredients, picture, directions} = req.body

        let newRecipe = {
            id: globalID,
            name: name,
            prepTime: prepTime,
            cookTime: cookTime,
            serves: serves,
            ingredients: ingredients,
            picture: picture,
            directions: directions,
            score: 0
        }

        recipes.push(newRecipe)

        globalID++

        res.status(200).send(recipes)
    },

    deleteRecipe: (req, res) => {
        const index = recipes.findIndex((el) => el.id === +req.params.id)

        recipes.splice(index, 1)

        res.status(200).send(recipes)
    },

    updateRecipe: (req, res) => {
        const index = recipes.findIndex((el) => el.id === +req.params.id)

        const {type} = req.body

        if (type === "like") {
            recipes[index].score++
        } else if (type === "dislike") {
            recipes[index].score--
        }

        res.status(200).send(recipes)
    }
}