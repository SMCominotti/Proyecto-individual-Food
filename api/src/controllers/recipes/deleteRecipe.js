const { Recipes } = require('../../db');

const deleteRecipe = async (idRecipes) => {
  try {
    const recipe = await Recipes.findOne({ where: { id: idRecipes } });

    if (!recipe) {
      throw new Error('La receta no existe');
    }

    await recipe.destroy();

    return { message: 'Receta eliminada exitosamente' };
  } catch (error) {
    throw new Error('Ha ocurrido un error al eliminar la receta');
  }
};

module.exports = deleteRecipe;
