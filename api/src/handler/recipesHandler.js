const getAllRecipes = require('../controllers/recipes/getAllRecipes.js');
const getById = require('../controllers/recipes/getById.js');
const postRecipes = require('../controllers/recipes/postRecip.js');
const deleteRecipe = require('../controllers/recipes/deleteRecipe.js');

const getRecipes = async (req, res) => {
  const { name } = req.query;
  try {
    const response = await getAllRecipes(name);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message, descripcion: 'No se encontraron recetas.' });
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

const postRecip = async (req, res) => {
  const { name, image, summary, healthScore, steps, diets } = req.body;
  try {
    const response = await postRecipes(name, image, summary, healthScore, steps);
    await response.addDiets(diets);
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
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getRecipe,
  getRecipes,
  postRecip,
  deleteRecipeHandler,
};
