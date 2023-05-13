import style from "./RecipeCard.module.css";

const RecipeCard = (allRecipes) => {
  const card= allRecipes.allRecipes
console.log(card)
   const {name, image, diets}= card
   console.log(name, image, diets)
    return(
     <div className={style.recipe}>
         <h3>{name}</h3>
         <img src={image} alt={name} />      
         <h5>{diets}</h5>  
     </div>
    )
}


export default RecipeCard

 /* <p>Summary: {props.summary}</p>
         <p>HealthScore: {props.healthScore}</p>
         <p>Steps:</p>
           <ol>
               {props.steps.map((step) => (
                 <li key={step.number}>
                     <p>Step {step.number}:</p>
                     <p>{step.step}</p>
                 </li>
                ))}
          </ol> */