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
      diets: elem.diets,
      steps: elem.analyzedInstructions
        .flatMap((instruction) => instruction.steps)
        .filter((step) => step && step.number && step.step)
        .map(({ number, step }) => ({ number, step })),
      createdInDataBase: false
    };
  });
};

module.exports = async (idRecipes) => {
  if (!idRecipes) {
    throw new Error(`No se encontraron recetas que coincidan con el id: '${idRecipes}'.`);
  }

  const idIsUUID = typeof idRecipes === 'string' && idRecipes.match(/[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}/gi);
  let recipes;

  if (idIsUUID) {
      recipes = await Recipes.findOne({
        where: { id: idRecipes },
        include: {
          model: Diets,
          attributes: ['name'],
          through: {
            attributes: []
          }
        }
      });
  } else {
      const recipeApi = await axios.get(`https://api.spoonacular.com/recipes/${idRecipes}/information?apiKey=${API_KEY}&addRecipeInformation=true&number=100`);
      recipes = cleanArray([recipeApi.data])[0];
    }

  if (!recipes) {
       throw new Error(`No se encontraron recetas que coincidan con el id: '${idRecipes}'.`);
  }

  return {
    id: recipes.id,
    name: recipes.name,
    image: recipes.image,
    summary: recipes.summary,
    healthScore: recipes.healthScore,
    diets: recipes.diets,
    steps: recipes.steps,
    createdInDataBase: recipes.created || false
  };
};
