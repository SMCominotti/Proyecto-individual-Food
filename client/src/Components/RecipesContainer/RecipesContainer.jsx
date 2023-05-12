import Recipe from "../RecipeCard/RecipeCard";
import style from "./RecipesContainer.module.css"
import { useSelector } from "react-redux";

const RecipesContainer = ()=> {

  const recipes = useSelector(state=>state.recipes)
 
    return (
        <div className={style.container}>
            {recipes.map(recipe=>{
                return <Recipe
                id={recipe.id}
                name={recipe.name}
                image={recipe.image}
                summary={recipe.summary}
                healthScore={recipe.healthScore}
                steps={recipe.steps}      
                />
            })}
        </div>
    )
}

export default RecipesContainer;

//Este componente debe tomar un array de recetas y por cada receta renderizar una tarjeta