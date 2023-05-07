const {Router} = require ('express');
const { getRecipes, getRecipe, postRecipes, putRecipes, deleteRecipes} = require ('../handler/recipesHandler.js')

//ROUTER
const recipesRouter = Router();

//ROUTES
recipesRouter.get('/', getRecipes);
recipesRouter.get('/:id', getRecipe);
recipesRouter.post('/', postRecipes);
recipesRouter.put('/', putRecipes);
recipesRouter.delete('/', deleteRecipes);

module.exports = recipesRouter;