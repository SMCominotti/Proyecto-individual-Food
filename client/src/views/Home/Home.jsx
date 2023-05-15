import RecipesContainer from "../../Components/RecipesContainer/RecipesContainer";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecipes, filterRecipesByDiets, filterCreated, orderByName } from "../../redux/actions";
import Paginado from '../Paginado/Paginado';
import style from './Home.mudule.css';

const Home = () => {
  const dispatch = useDispatch();
  const allRecipes = useSelector((state) => state.recipes);
  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 9;

  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = allRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe);//esto se modifica dependiendo de la pagina en donde este.

  const [orden, setOrden] = useState("")

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getRecipes());
  }, [dispatch]);

  // function handleClick(event) {
  //   event.preventDefault();
  //   dispatch(getRecipes());
  // }
  function handleFilterDiets(event) {
    dispatch(filterRecipesByDiets(event.target.value));
  }
  
  function handleFilterCreated(e){
    e.preventDefault();
    dispatch(filterCreated(e.target.value));
    setCurrentPage(1);
    setOrden(`Ordenado ${e.target.value}`);
}

function handleOrderByName(e){
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    setCurrentPage(1);
    setOrden(`Ordenado ${e.target.value}`);
}

  return (
    <div className="home">
      <h1 className="heading title">Smak</h1>
      <h2 className="heading subTitle">Sabores del alma</h2>
      {/* <button onClick={handleClick}>Volver a cargar todas las Recetas</button> */}
      <div className="selectors-container">
      <select onChange={e=>handleOrderByName(e)} className="custom-select">
     
          <option value="asc">Ascendente</option>
          <option value="desc">Descendente</option>
        </select>
        <select onChange={event => handleFilterDiets(event)} className="custom-select">
          <option value="All">Todas las Recetas</option>
          <option value="gluten free">Sin Gluten</option>
          <option value="dairy free">Sin Lácteos</option>
          <option value="lacto ovo vegetarian">Lacto-Ovo-Vegetariana</option>
          <option value="vegan">Vegana</option>
          <option value="paleolithic">Paleo</option>
          <option value="primal">Primal</option>
          <option value="whole 30">Whole30</option>
          <option value="pescatarian">Pesca-vegetariana</option>
          <option value="ketogenic">Keto</option>
          <option value="fodmap friendly">Fodmap</option>
        </select>
        <select onChange={event => handleFilterCreated(event)} className="custom-select">
        <option value='all'>Todas</option>
                    <option value='api'>Existente</option>
                    <option value='createdInDataBase'>Creados</option>
        </select>
      </div>
      <RecipesContainer recipes={currentRecipes} />
      <Paginado
        currentPage={currentPage}
        recipesPerPage={recipesPerPage}
        totalRecipes={allRecipes.length}
        paginado={paginado}
      />
      </div>
  );
};

export default Home;
