const { Recipes } = require('../../db');

const deleteRecipe = async (idRecipes) => {
  try {
    const recipe = await Recipes.findOne({ where: { id: idRecipes } });
//busco en la base de datos la receta que coindida con ese id para elimnarla)
    if (!recipe) {
      throw new Error('La receta no existe');
    }

    await recipe.destroy();
//si la encuentra, utiliza destroy para eliminarla
    return { message: 'Receta eliminada exitosamente' };
  } catch (error) {
    throw new Error('Ha ocurrido un error al eliminar la receta');
  }
};

module.exports = deleteRecipe;
