import RecipesContainer from "../../Components/RecipesContainer/RecipesContainer";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { getRecipes } from "../../redux/actions";
import { getRecipe } from "../../redux/actions";

const Home = () => {

  const dispatch = useDispatch();

  const allRecipes = useSelector((state) => state.recipes);

  useEffect(() => {
    dispatch(getRecipes());
  },[dispatch]);

  function handleClick(event) {
    event.preventDefault();
    dispatch(getRecipes());
  }

  return (
    <>
      <h1>Smak: Sabores del alma</h1>
      <button onClick={event => handleClick (event)}>
        Volver a cargar todas las Recetas
      </button>
      <div>
        <select>
          <option value="asc">Ascendente</option>
          <option value="desc">Descendente</option>
        </select>
        <select>
          <option value="All">Todas las Recetas</option>
          <option value="gluten free">Sin Gluten</option>
          <option value="dairy free">Sin Lácteos</option>
          <option value="lacto ovo vegetarian">Lacto-Ovo-Vegetariana</option>
          <option value="vegan">Vegana</option>
          <option value="paleolithic ">Paleo</option>
          <option value="primal">Primal</option>
          <option value="whole 30">Whole30</option>
          <option value="pescatarian">Pesca-vegetariana</option>
          <option value="ketogenic">Keto</option>
          <option value="fodmap friendly">Fodmap</option>
        </select>
        <select>
          <option value="All">Todas</option>
          <option value="created">Creados</option>
          <option value="api">Existentes</option>
        </select>
     </div>
      <RecipesContainer allRecipes={allRecipes}/>
      
    </>
  );
}

  
export default Home;
