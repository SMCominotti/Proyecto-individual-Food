const { Router } = require('express');
const { getRecipes, getRecipe, postRecip } = require('../handler/recipesHandler.js');

//ROUTER
const recipesRouter = Router();

//ROUTES

recipesRouter.get('/', getRecipes);
recipesRouter.get('/:idRecipes', getRecipe);
recipesRouter.post('/', postRecip); 

module.exports = recipesRouter;
