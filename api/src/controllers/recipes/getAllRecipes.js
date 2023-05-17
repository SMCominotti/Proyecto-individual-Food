const axios = require('axios');
require('dotenv').config();
const { API_KEY } = process.env;
const { Recipes, Diets } = require('../../db');
const { Op } = require('sequelize');

module.exports = async (name) => {
  const cleanArray = (array) => {
    return array.map((elem) => {
      return {
        id: elem.id,
        name: elem.title,
        image: elem.image,
        summary: elem.summary,
        healthScore: elem.healthScore,
        diets: elem.diets,
        steps: elem.analyzedInstructions //step se encuentra dentro de esta propiedad
          .flatMap((instruction) => instruction.steps) //aplico FlatMap para combinar todos los arrays en uno solo (de la propiedad steps)
          .filter((step) => step && step.number && step.step) //mediante un filter elimino los que sean nulos, no tengan numer de pasos o texto dentro de step
          .map(({ number, step }) => ({ number, step })),//hago un map tomando solo las propiedades number y step  
        createdInDataBase: false
        };
    });
  };

  if (name) {
    const recipesApi = await axios.get("https://run.mocky.io/v3/84b3f19c-7642-4552-b69c-c53742badee5")
    //(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`);
    const recipesDb = await Recipes.findAll({
      where: {
        name: {
          [Op.iLike]: `%${name}%`,
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
      const{id, name, image, summary, healthScore, steps, diets}=recipes;
      const nva=diets.map(diet=>diet.name)
      return {id, name, image, summary, healthScore, steps, diets: nva,createdInDataBase:true};
    })

    const response = [...resultDb, ...filterApi];

    const result = response.filter((recipes) => recipes.name && recipes.name.toLowerCase().includes(name.toLowerCase()));
    //con toLowerCase convierto todo a minuscula para evitar que haya alguna diferencia a la hora de analizar el nombre
    if (result.length === 0) {
      throw new Error(`No se encontraron recetas que coincidan con '${name}'.`);
    }

    return result;
  } else {
    const recipesApi = await axios.get("https://run.mocky.io/v3/84b3f19c-7642-4552-b69c-c53742badee5")
    //(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`);
    const recipesDb = await Recipes.findAll({
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
      return {id,name,image,summary, healthScore, steps, diets: nva,createdInDataBase:true};
    })

    return [...resultDb, ...filterApi];
 
  }
};
