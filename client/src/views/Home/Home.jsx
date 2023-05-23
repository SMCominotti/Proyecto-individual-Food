import RecipesContainer from "../../Components/RecipesContainer/RecipesContainer";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecipes, filterRecipesByDiets, filterCreated, orderByName , setLoading, orderByScore } from "../../redux/actions";
import Paginado from '../Paginado/Paginado';
import SearchBar from "../SearchBar/SearchBar";
import style from './Home.mudule.css';

const Home = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.loading);
  const allRecipes = useSelector((state) => state.recipes); //accedo a la parte del estado global que tiene las recetas y se la asigno a la constante allRecipes
  const [currentPage, setCurrentPage] = useState(1); //página actual
  const recipesPerPage = 9; //cantidas de recetas por pagina

  const indexOfLastRecipe = currentPage * recipesPerPage; //multiplico el numero de pagina actual por la cantidad de rectas por pagina para saber cual es la ultima receta de esa pagina. Ej si estoy en la pag 2, 2x9=18, la receta 18 es la ultima de la pagina 2
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage; //y con esta obtengo el indice de la primer receta que se debe mostrar en la pagina. 
  const currentRecipes = allRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe);//esto se modifica dependiendo de la pagina en donde este. Con esto obtengo el fragmento que se muestra por pagina

  const [order, setOrder] = useState("")

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };//se actualiza currentpage cuando se hace click en la pagina

  useEffect(() => {
    dispatch(setLoading(true)); // establece el estado de carga a true
  
    dispatch(getRecipes())
      .then(() => {
        dispatch(setLoading(false)); // establece el estado de carga a false cuando se completa la obtención de las recetas
      })
      .catch((error) => {
        console.error("Error fetching recipes:", error);
        dispatch(setLoading(false)); //  maneja cualquier error y establecer el estado de carga a false
      });
  }, [dispatch]);


  function handleFilterDiets(event) {
    dispatch(filterRecipesByDiets(event.target.value)); 
  }  
  //cuando se selecciona este filtro se despacha la accion y el valor seleccionado se pasa como argumento para filtrar por dietas
  
  
  function handleFilterCreated(event){
    event.preventDefault();
    dispatch(filterCreated(event.target.value));
    setCurrentPage(1);
    setOrder(`Ordenado ${event.target.value}`);
  }
  //cuando se selecciona este filtro se despacha la accion y el valor seleccionado se pasa como argumento para filtrar por creado.Además, se reinicia la página actual y se actualiza el estado orden con el valor seleccionado.

  function handleOrderByName(event){
    event.preventDefault();
    dispatch(orderByName(event.target.value));
    setCurrentPage(1);
    setOrder(`Ordenado ${event.target.value}`);
  }//cuando se selecciona este filtro se despacha la accion y el valor seleccionado se pasa como argumento para filtrar por orden alfabetico.Además, se reinicia la página actual y se actualiza el estado orden con el valor seleccionado.

  
  function handleScore(event) {
      if(!event.target.value) return dispatch(getRecipes())
      // event.preventDefaults()
      dispatch(orderByScore(event.target.value))
      setCurrentPage(1)
      setOrder(`Ordenado ${event.target.value}`)
    }

  return (
    <div className="home">
      <h1 className="heading title">Smak</h1>
      <h2 className="heading subTitle">Sabores del alma</h2>
      <div className="selectorsContainer">
        <SearchBar />
        <select onChange={event => handleScore(event)} className="custom-select">
                    <option value=''> ORDER BY SCORE </option>
                    <option value='health'> Helthier</option>
                    <option value='notHealth'> Less Healthy </option>
                </select>
        {/* <select onChange={event => handleScore(event)} className="custom-select">
          <option value='Order By Score'> ORDER BY SCORE </option>
          <option value='ScoreMax'> Score Max</option>
          <option value='ScoreMin'> Score Min </option>
        </select> */}
        <select onChange={event => handleOrderByName(event)} className="custom-select">
          <option value='Alphabetical Order'> ALPHABETICAL ORDER </option>
          <option value="asc">Ascending Order</option>
          <option value="desc">Falling Order</option>
        </select>
        <select onChange={event => handleFilterDiets(event)} className="custom-select">
          <option value="All">ALL DIETS</option>
          <option value="gluten free">Gluten Free</option>
          <option value="dairy free">Dairy Free</option>
          <option value="lacto ovo vegetarian">Lacto Ovo Vegetarian</option>
          <option value="vegan">Vegan</option>
          <option value="paleolithic">Paleolithic</option>
          <option value="primal">Primal</option>
          <option value="whole 30">Whole30</option>
          <option value="pescatarian">Pescatarian</option>
          <option value="ketogenic">Ketogenic</option>
          <option value="fodmap friendly">Fodmap Friendly</option>
        </select>
        <select onChange={event => handleFilterCreated(event)} className="custom-select">
          <option value="all">ALL RECIPES</option>
          <option value="api">Existing</option>
          <option value="createdInDataBase">User-Created</option>
        </select>
        {loading ? (
           <div class="loader-wrapper">
           <div class="loader">
               <div class="loader loader--inner"></div>
           </div>
           </div>
        ) : (
          <>
            <RecipesContainer recipes={currentRecipes} />
            <Paginado
              currentPage={currentPage}
              recipesPerPage={recipesPerPage}
              totalRecipes={allRecipes.length}
              paginado={paginado}
            />
          </>
        )}
      </div>
    </div>
  );
  
};

export default Home;
