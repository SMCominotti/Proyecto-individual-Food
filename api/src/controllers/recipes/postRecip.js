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