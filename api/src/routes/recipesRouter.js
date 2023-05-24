const { Router } = require('express');
const { getRecipes, getRecipe, postRecip, deleteRecipeHandler } = require('../handler/recipesHandler.js');
// se importan del handler xque son quienes manejan las respuestas para las rutas
const recipesRouter = Router();

recipesRouter.get('/', getRecipes);
recipesRouter.get('/:idRecipes', getRecipe);
recipesRouter.post('/', postRecip);
recipesRouter.delete('/:idRecipes', deleteRecipeHandler);
//se configuran las rutas y se asocian con las funciones de los handler correspondientes. 
//Cada llamada a método (get, post, delete, etc.) se hace en el objeto recipesRouter y se especifica la ruta y la función de handler correspondiente.


module.exports = recipesRouter;
