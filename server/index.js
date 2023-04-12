const express = require('express')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(cors())

const {getAllRecipes, addRecipe, deleteRecipe, updateRecipe} = require('./controller')

app.get('/recipes', getAllRecipes)
app.post('/recipes', addRecipe)
app.delete('/recipes/:id', deleteRecipe)
app.put('/recipes/:id', updateRecipe)

app.listen(5896, () => console.log('Not catching hands on port 5896'))