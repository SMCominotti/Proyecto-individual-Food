
const axios = require ('axios')
require('dotenv').config();
const {API_KEY} = process.env;
const {Recipes} = require ('../db')
const { Op } = require('sequelize');


  
  const cleanArray = (arr) => 
  arr.map((element) => {
    return {
      name: element.name,
      id: element.id,
      image: element.image,
      summary:element.summary,
      healtScore: element.healtScore,
      step: element.step,
      created: false, 
    };
  });


module.exports = async (name) => {
  if (name) {
    const recipesApiRaw = (
      await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`)).data; // Se busca si existe name en la API. La respueta se almacena en la variable recipesApi.
    const recipesApi= cleanArray(recipesApiRaw);
    const recipesDb = await Recipes.findAll({// luego busco todo en la base de datos y hago un find en donde busque recetas que coincidan con el nombre independientemente de mayúsculas y minúsculas
      where: {
        name: {
          [Op.iLike]: `%${name}%`,   
        },
      },
    });
    const response = [...recipesApi, ...recipesDb]; //concateno las respuestas de la API y la base de datos. Las guardo en la variable response
    const result = response.filter(recipe => recipe.name.toLocaleLowerCase().includes(name.toLocaleLowerCase()));// Hago un filter para buscar dentro de response (que tiene tanto los valores de la Api como la base de datos), que el name que le pasé por parámetro esté adentro de title, sin importar mayúsculas y minúsculas. El resultado lo guardo en la variable result. 
    if (result.length === 0) { // Si no encuentro recetas con ese nombre, el array estará vacío, en ese caso, lanzo un error para que lo maneje el Handler, informando que no hay recetas con ese nombre.
        throw new Error(`No se encontraron recetas que coincidan con '${name}'.`);
      }
    return result;
  } else { //si el nombre que busco, no existe
    const recipesApi = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`);//hago la peticion a la API y guardo su respuesta en recipes
    const recipesDb = await Recipes.findAll();//Ahora busco dentro de la base de datos Recipes todas las recetas.
    const response = [...recipesApi.data.results, ...recipesDb]; //concateno ambas respuestas en la constante Response y la retorno.
    return response;
  }
};





