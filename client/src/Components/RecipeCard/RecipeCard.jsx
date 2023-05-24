import style from "./RecipeCard.module.css";
import {Link} from 'react-router-dom';
// import { useDispatch } from 'react-redux';
//import { removeRecipes } from '../actions';
//Si quisiera borrar una receta desde el front

// const RecipeCard = ({ recipe }) => {
//   const dispatch = useDispatch();

const RecipeCard = ({ recipe }) => {
  const { name, image, diets, id } = recipe;
  const formattedName = name.toUpperCase();

  const formattedDiets = diets.map((diet) => diet.toUpperCase());

  //Si quisiera borrar desde aca, yo lo hice dde el back
  // const removeRecipeHandler = () => {
  //   dispatch(removeRecipes(id));
  // };

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
          {/* <button className={style.button} onClick={removeRecipeHandler}>
          Remove
        </button> */}
        </div>
      </div>
  );
};

//en caso de querer borrar tengo que agregar un boton, para que cuando haga click se genere la accion.
export default RecipeCard;




