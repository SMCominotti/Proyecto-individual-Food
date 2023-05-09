const axios = require ('axios')
require('dotenv').config();
const {API_KEY} = process.env; //se importa con el objeto de no tener que poner la api key original 
const {Recipes} = require ('../../db') 

module.exports = async (idRecipes) => {
    if(!idRecipes) throw new Error(`No se encontraron recetas que coincidan con el id: '${idRecipes}'.`);

    const recipeApi = await axios.get(`https://api.spoonacular.com/recipes/${idRecipes}/information?apiKey=${API_KEY}&addRecipeInformation=true&number=100`)
    // console.log(recipeApi.data)
    if(recipeApi) { 
        return recipeApi.data
    }else {
        const recipeDb = await Recipes.findByPk(idRecipes)
        return recipeDb
    }    
}


//


