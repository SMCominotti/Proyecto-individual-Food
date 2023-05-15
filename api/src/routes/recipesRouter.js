const { Router } = require('express');
const { getRecipes, getRecipe, postRecip, deleteRecipeHandler } = require('../handler/recipesHandler.js');

const recipesRouter = Router();

recipesRouter.get('/', getRecipes);
recipesRouter.get('/:idRecipes', getRecipe);
recipesRouter.post('/', postRecip);
recipesRouter.delete('/:idRecipes', deleteRecipeHandler);

module.exports = recipesRouter;
