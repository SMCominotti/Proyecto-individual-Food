const { Recipes } = require('../../db')

module.exports = async (
                        name, 
                        image, 
                        summary, 
                        healthScore, 
                        steps,
                        createdInDataBase) => {
    const newRecipe = await Recipes.create({
                                            name, 
                                            image, 
                                            summary, 
                                            healthScore, 
                                            steps,
                                            createdInDataBase
     })
    return newRecipe
}


//si quisiera hacer un put
//importo  getById
//const recipes (name, image, summary, healthScore, steps, diets)
//const upDateRecipe = (idRecipes, name, image, summary, healthScore, steps) =>{
    //const recipe= getById(idRecipes)
    //if (recipe.error) return recipe;
    //recipe.name = name
    //recipe.image = image
    //recipe.summary = summary
    //recipe.healthScore = healthScore
    //recipe.steps = steps
    //return recipe;
    //}
    //exporto upDareRecipe //que lo toma el handler


