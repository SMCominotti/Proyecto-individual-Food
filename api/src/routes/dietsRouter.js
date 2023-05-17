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


module.exports = dietsRouter;