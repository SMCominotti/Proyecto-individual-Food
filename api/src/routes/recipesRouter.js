const { Router } = require('express');
const { getRecipes, getRecipe, postRecip, deleteRecipeHandler } = require('../handler/recipesHandler.js');
// se importan del handler xque son quienes manejan las respuestas
const recipesRouter = Router();

recipesRouter.get('/', getRecipes);
recipesRouter.get('/:idRecipes', getRecipe);
recipesRouter.post('/', postRecip);
recipesRouter.delete('/:idRecipes', deleteRecipeHandler);

module.exports = recipesRouter;
