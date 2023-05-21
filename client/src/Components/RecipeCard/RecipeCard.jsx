import style from "./RecipeCard.module.css";
import {Link} from 'react-router-dom';

const RecipeCard = ({ recipe }) => {
  const { name, image, diets, id } = recipe;
  const formattedName = name.toUpperCase();

  const formattedDiets = diets.map((diet) => diet.toUpperCase());

  return (
    <div className={style.recipe}>
      <div className={style.content}>
        <h3 className="heading">{formattedName}</h3>
      </div>
      <div className={style.imageContainer}>
        <img
          id="recipeImage"
          src={image}
          alt={name}
          className={style.recipeImage}
        />
      </div>
       <h4 className={`heading ${style.diets}`} style={{ marginTop: "10px" }}>
        {formattedDiets.join(", ")}</h4>
        <div>
          <Link to={`/detail/${id}`}>
            <button className={style.button}>See more</button>
          </Link>
        </div>
      </div>
  );
};

export default RecipeCard;





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