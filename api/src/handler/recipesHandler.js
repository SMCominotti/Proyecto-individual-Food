const getAllRecipes = require('../controllers/recipes/getAllRecipes.js');
const getById = require('../controllers/recipes/getById.js');
const postRecipes = require('../controllers/recipes/postRecip.js');
const deleteRecipe = require('../controllers/recipes/deleteRecipe.js');
//aca se importa todo desde controllers.. ahi se hace la logica y acá se maneja la respuesta

const getRecipes = async (req, res) => {
  const { name } = req.query; //hace un req, espera recibir name por query
  try {
      const response = await getAllRecipes(name); //getAllRecipes es un controller
      if(!response.length) return res.status(400).json({ error: error.message, descripcion: 'No se encontraron recetas.' }); //no se encontraron con ese nombre
    
      res.status(200).json(response); //si todo sale bien se envía el contenido de la receta.
  } catch (error) {
      res.status(400).json({ error: error.message });//otro tipo de error
  }
};

const getRecipe = async (req, res) => {
  const { idRecipes } = req.params;
  try {
      const response = await getById(idRecipes);
      res.status(200).json(response);
  } catch (error) {
      res.status(400).json({ error: error.message, descripcion: 'No se ha encontrado el id' });
  }
};
//params es una propiedad del objeto req. Lo que se pone en la url se guarda en esa propiedad.

const postRecip = async (req, res) => {
const { name, image, summary, healthScore, steps, diets } = req.body; // los datos se reciben por body
  try {
      const response = await postRecipes(name, image, summary, healthScore, steps);//estos de recipes
      await response.addDiets(diets); //y se agrega dietas (de la base de datos)
      res.status(200).json(response);
  } catch (error) {
      res.status(400).json({ error: error.message, descripcion: 'Error en postRecipes' });
  }
};


const deleteRecipeHandler = async (req, res) => {
const { idRecipes } = req.params;
  try {
    const response = await deleteRecipe(idRecipes);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
//Los exporto para que sean utilizados en las rutas
module.exports = {
  getRecipe,
  getRecipes,
  postRecip,
  deleteRecipeHandler,
};

// const putRecipe = async (req, res) => { //exporto putRecipe para las rutas
//   const { idRecipes } = req.params; //por id busca
//  const { name, image, summary, healthScore, steps, diets } = req.body; // los datos se reciben por body // le llega lo que quiere actualizar
//   try {
//       const putById= upDateRecipe(idRecipes,name, image, summary, healthScore, steps, diets) //upDateRecipes viene de controller
//       res.status(200).json(putById);
//   } catch (error) {
//       res.status(400).json({ error: error.message, descripcion: 'No se ha encontrado el id' });
//   }
// };