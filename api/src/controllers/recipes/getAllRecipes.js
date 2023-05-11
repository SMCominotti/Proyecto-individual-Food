const axios = require('axios');
require('dotenv').config();
const { API_KEY } = process.env;
const { Recipes, Diets } = require('../../db');
const { Op } = require('sequelize');

module.exports = async (title) => {
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

  if (title) {
    const recipesApi = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`);
    const recipesDb = await Recipes.findAll({
      where: {
        name: {
          [Op.iLike]: `%${title}%`,
        },
      },
      include: {
        model: Diets,
        attributes: ['name'],
        through: {
          attributes: [],
        },
      },
    });
    const filterApi = cleanArray(recipesApi.data.results);
    const response = [...recipesDb, ...filterApi];

    const result = response.filter((recipes) => recipes.name && recipes.name.toLowerCase().includes(title.toLowerCase()));

    if (result.length === 0) {
      throw new Error(`No se encontraron recetas que coincidan con '${title}'.`);
    }

    return result;
  } else {
    const recipesApi = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`);
    const recipesDb = await Recipes.findAll({
      include: {
        model: Diets,
        attributes: ['name'],
        through: {
          attributes: [],
        },
      },
    });
    const filterApi = cleanArray(recipesApi.data.results);
    return [...recipesDb, ...filterApi];
  }
};
