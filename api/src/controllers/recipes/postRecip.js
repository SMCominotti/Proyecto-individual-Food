const { Recipes } = require('../../db')

module.exports = async (name, image, summary, healthScore, steps) => {
    const newRecipe = await Recipes.create({name, image, summary, healthScore, steps})
    return newRecipe
}