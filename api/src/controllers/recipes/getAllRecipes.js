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
        diets:elem.diets,
        steps: elem.analyzedInstructions
          .flatMap((instruction) => instruction.steps)
          .filter((step) => step && step.number && step.step)
          .map(({ number, step }) => ({ number, step })),
        };
    });
  };

  if (title) {
    const recipesApi = await axios.get("https://run.mocky.io/v3/84b3f19c-7642-4552-b69c-c53742badee5")
    //(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`);
    const recipesDb = await Recipes.findAll({
      where: {
        name: {
          [Op.iLike]: `%${title}%`,
        },
      },
      include: {
               model: Diets,
               atributes:['name'],
                 through:{
                 atributes:[],
                 }
               }
      });

    const filterApi = cleanArray(recipesApi.data.results);

    const resultDb= recipesDb.map((recipes)=>{
      const{id,name,image,summary, healthScore, steps, diets}=recipes;
      const nva=diets.map(diet=>diet.name)
      return {id,name,image,summary, healthScore, steps, diets: nva,createdInDataBase:'true'};
    })

    const response = [...resultDb, ...filterApi];

    const result = response.filter((recipes) => recipes.name && recipes.name.toLowerCase().includes(title.toLowerCase()));

    if (result.length === 0) {
      throw new Error(`No se encontraron recetas que coincidan con '${title}'.`);
    }

    return result;
  } else {
    const recipesApi = await axios.get("https://run.mocky.io/v3/84b3f19c-7642-4552-b69c-c53742badee5")
    //(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`);
    const recipesDb = await Recipes.findAll({
      include: [{
        model: Diets,
        }]
   });
    
    const filterApi = cleanArray(recipesApi.data.results);
    
    const resultDb= recipesDb.map((recipes)=>{
      const{id,name,image,summary, healthScore, steps, diets}=recipes;
      const nva=diets.map(diet=>diet.name)
      return {id,name,image,summary, healthScore, steps, diets: nva,createdInDataBase:'true'};
    })

    return [...resultDb, ...filterApi];
 
  }
};
