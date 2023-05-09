const {Recipes} = require ('../../db')

module.exports=  async (data) =>{
    const newRecipe= await Recipes.create(data)
    return newRecipe
}