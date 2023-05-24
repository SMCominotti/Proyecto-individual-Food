const { Router } = require('express');
// Importar todos los routers;
// Esto permite definir rutas y manejar las solicitudes entrantes.

const recipesRouter = require ('./recipesRouter');
const dietsRouter = require ('./dietsRouter');
// routers que serán utilizados para manejar rutas específicas
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/recipes', recipesRouter);
router.use('/diets', dietsRouter);
//se configuran y se montan los routers importados en rutas específicas dentro del router principal. Aquí se indica que las rutas que comiencen con /recipes serán manejadas por el router recipesRouter, y las rutas que comiencen con /diets serán manejadas por el router dietsRouter. Esto permite organizar las rutas en módulos separados y facilita la escalabilidad y el mantenimiento del código.


module.exports = router;
