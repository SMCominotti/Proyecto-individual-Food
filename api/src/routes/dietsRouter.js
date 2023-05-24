const {Router} = require ('express');
const { getDiets, getDiet, postDiets,putDiets, deleteDiets} = require ('../handler/dietsHandler');
//ROUTER
const dietsRouter = Router();

//ROUTES
dietsRouter.get('/', getDiets);
// dietsRouter.get('/:id', getDiet);
// dietsRouter.post('/', postDiets);
// dietsRouter.put('/', putDiets);
// dietsRouter.delete('/', deleteDiets);

//se configuran las rutas y se asocian con las funciones de los handler correspondientes. 
//Cada llamada a método (get, post, delete, etc.) se hace en el objeto recipesRouter y se especifica la ruta y la función de handler correspondiente.

module.exports = dietsRouter;