const axios = require('axios');
require('dotenv').config();
const { API_KEY } = process.env;
const { Recipes, Diets } = require('../../db');

const cleanArray = (array) => {
  return array.map((elem) => {
    return {
      id: elem.id,
      name: elem.title,
      image: elem.image,
      summary: elem.summary,
      healthScore: elem.healthScore,
      steps: elem.analyzedInstructions
        .flatMap((instruction) => instruction.steps)
        .filter((step) => step && step.number && step.step)
        .map(({ number, step }) => ({ number, step })),
    };
  });
};

module.exports = async (idRecipes) => {
  if (!idRecipes) throw new Error(`No se encontraron recetas que coincidan con el id: '${idRecipes}'.`);

  const recipeApi = await axios.get(`https://api.spoonacular.com/recipes/${idRecipes}/information?apiKey=${API_KEY}&addRecipeInformation=true&number=100`);

  if (recipeApi.data) {
    const filterApi = cleanArray([recipeApi.data]);
    return filterApi;
  } else {
    const recipeDb = await Recipes.findByPk(idRecipes, {
      include: {
        model: Diets,
        attributes: ['name'],
        through: {
          attributes: [],
        },
      },
    });
    return recipeDb;
  }
};




