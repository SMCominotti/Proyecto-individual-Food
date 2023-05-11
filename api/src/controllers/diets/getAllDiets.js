const axios = require('axios');
require('dotenv').config();
const { API_KEY } = process.env;
const { Diets } = require('../../db');

module.exports = async () => {
  const recipesApi = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`);
  const recipesData = recipesApi.data; // Obtener los datos de la respuesta de la API

  const diets = recipesData.results.map(element => element.diets).flat(); // Obtener las dietas de los datos de las recetas
  const temp = [...new Set(diets)];
  const response = temp.filter(e => e !== undefined);

  for (const diet of response) {
    const existingDiet = await Diets.findOne({ where: { name: diet } });
    if (!existingDiet) {
      await Diets.create({ name: diet });
    }
  }

  const allDiets = await Diets.findAll();
  return allDiets;
};






