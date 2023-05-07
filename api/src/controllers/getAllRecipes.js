
const axios = require ('axios')
require('dotenv').config();
const { API_URL, API_KEY} = process.env;
const {Recipes} = require ('../db')

module.exports = async(name) => {
    if (name){
        let recipes = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`)
        const recipesDb = await Recipes.findAll();
        const temp= recipesDb.map(e=>e.dataValues) 
        const response = [...recipes.data.results,...temp]
        let result = response.filter(recipe => recipe.title.toLocaleLowerCase().includes(name.toLocaleLowerCase()))
        return result
    }else{
        const recipes = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`)
       const recipesDb = Recipes.findAll();
       const temp= recipesDb.map(e=>e.dataValues) 
        return [...recipes.data.results,...temp]
    }
 }

