import RecipeCard from "../RecipeCard/RecipeCard";
import style from "./RecipesContainer.module.css";

const RecipesContainer = ({ recipes }) => {
  return (
    <div className={style.container}>
      {recipes.map((recipe, index) => (
        <RecipeCard key={index} recipe={recipe} />
      ))}
    </div>
  );
};

export default RecipesContainer;


//Aca muestro una card (con la estructura de recipeCard) por cada receta, Hago un map para recorrer una a una.