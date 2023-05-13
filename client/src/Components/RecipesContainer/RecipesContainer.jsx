import RecipeCard from "../RecipeCard/RecipeCard";
import style from "./RecipesContainer.module.css"


const RecipesContainer = ({allRecipes})=> {
 
    return (
        <div className={style.container}>
            {allRecipes.map((recipe,index)=>(
               <RecipeCard
               key= {index}
               allRecipes={recipe}
               />
            ))}
        </div>
    )
}

export default RecipesContainer;

