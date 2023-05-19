import RecipesContainer from "../../Components/RecipesContainer/RecipesContainer";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecipes, filterRecipesByDiets, filterCreated, orderByName } from "../../redux/actions";
import Paginado from '../Paginado/Paginado';
import SearchBar from "../SearchBar/SearchBar";
import style from './Home.mudule.css';

const Home = () => {
  const dispatch = useDispatch();
  const allRecipes = useSelector((state) => state.recipes); //accedo a la parte del estado global que tiene las recetas y se la asigno a la constante allRecipes
  const [currentPage, setCurrentPage] = useState(1); //página actual
  const recipesPerPage = 9; //cantidas de recetas por pagina

  const indexOfLastRecipe = currentPage * recipesPerPage; //multiplico el numero de pagina actual por la cantidad de rectas por pagina para saber cual es la ultima receta de esa pagina. Ej si estoy en la pag 2, 2x9=18, la receta 18 es la ultima de la pagina 2
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage; //y con esta obtengo el indice de la primer receta que se debe mostrar en la pagina. 
  const currentRecipes = allRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe);//esto se modifica dependiendo de la pagina en donde este. Con esto obtengo el fragmento que se muestra por pagina

  const [orden, setOrden] = useState("")

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };//se actualiza currentpage cuando se hace click en la pagina

  useEffect(() => { //una vez que el componente se monto, se despacha el getRecipes para traer las recetas
    dispatch(getRecipes());
  }, [dispatch]);


  function handleFilterDiets(event) {
    dispatch(filterRecipesByDiets(event.target.value)); //cuando se selecciona este filtro se despacha la accion y el valor seleccionado se pasa como argumento para filtrar por dietas
  }
  
  function handleFilterCreated(event){
    event.preventDefault();
    dispatch(filterCreated(event.target.value));
    setCurrentPage(1);
    setOrden(`Ordenado ${event.target.value}`);
}//cuando se selecciona este filtro se despacha la accion y el valor seleccionado se pasa como argumento para filtrar por creado.Además, se reinicia la página actual y se actualiza el estado orden con el valor seleccionado.

function handleOrderByName(event){
    event.preventDefault();
    dispatch(orderByName(event.target.value));
    setCurrentPage(1);
    setOrden(`Ordenado ${event.target.value}`);
}//cuando se selecciona este filtro se despacha la accion y el valor seleccionado se pasa como argumento para filtrar por orden alfabetico.Además, se reinicia la página actual y se actualiza el estado orden con el valor seleccionado.

  return (
    <div className="home">
      <h1 className="heading title">Smak</h1>
      <h2 className="heading subTitle">Sabores del alma</h2>
      <div className="selectors-container">
      <SearchBar/>
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
