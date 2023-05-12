import style from "./RecipeCard.module.css";

const RecipeCard = (props) => {
    return(
     <div className={style.recipe}>
         <p>Name: {props.name}</p>
         <p>Image: {props.image}</p>
         <p>Summary: {props.summary}</p>
         <p>HealthScore: {props.healthScore}</p>
         <p>Steps:</p>
           <ol>
               {props.steps.map((step) => (
                 <li key={step.number}>
                     <p>Step {step.number}:</p>
                     <p>{step.step}</p>
                 </li>
                ))}
          </ol>
     </div>
    )
}


export default RecipeCard