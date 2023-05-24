import { SET_LOADING, GET_RECIPES, FILTER_BY_DIETS, FILTER_CREATED, ORDER_BY_NAME, ERROR_GET_RECIPES, ERROR_GET_NAME_RECIPES, GET_NAME_RECIPES, ERROR_GET_DIETS ,GET_DIETS, CLEAN_DATA, GET_DETAILS, POST_RECIPES , ORDER_BY_SCORE } from "./actions";

const initialState = {
  recipes: [],//se utiliza para almacenar las recetas que se muestran en la aplicación después de aplicar algún filtro o ordenamiento.
  allRecipes: [],//se utiliza para almacenar todas las recetas obtenidas del servidor.
  error: null, // Valor inicial para representar la ausencia de error
  allDiets:[],
  recipeDetail:{},
  loading: false,
};


const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload,//representa el nuevo estado de carga (loading) que se desea establecer en el estado global de la aplicación.
      };

     case GET_RECIPES:
      return {
        ...state,
        recipes: action.payload,
        allRecipes: action.payload,
        error: null, // Reinicia el estado de error a null en caso de éxito
      };
    case GET_NAME_RECIPES:
        return {
            ...state,
            recipes: action.payload,
            error: null, // Reinicia el estado de error a null en caso de éxito
        }

    case GET_DIETS:
        return {
            ...state,
            diets: action.payload,
            error: null, // Reinicia el estado de error a null en caso de éxito
        }

  // case POST_RECIPES:
  //  return {
  //     ...state,
  // }

  //case REMOVE_RECIP:
  //return{
  // ...state,
  //recipes: payload
  //allRecipes:payload
  //}
        
    case FILTER_BY_DIETS:
      const allRecipes = state.allRecipes;
      const dietsFiltered =
        action.payload === "All"
          ? allRecipes
          : allRecipes.filter((recipe) =>
              recipe.diets.includes(action.payload)
            );
        return {
          ...state,
          recipes: dietsFiltered,
          error: null, // Reinicia el estado de error a null
        };
    case FILTER_CREATED:
      const allRecipes2 = state.allRecipes; //Se crea una copia del estado con todas las recetas
      const createdFilter =
        action.payload === "createdInDataBase" //se evaluan solo las que tengan esta propiedad
          ? allRecipes2.filter((element) => element.createdInDataBase) //se filtran por un lado las que tengan esa propiedad en true
          : allRecipes2.filter((element) => !element.createdInDataBase); //y por otro las que lo tengan en false
        return {
          ...state,
          recipes: action.payload === "all" ? allRecipes2 : createdFilter,
          //Si action.payload es igual a "all",muestro todas las recetas (sin filtro)= allRecipe2
          // si no es all,  se asigna createdFilter al estado recipes, lo que corresponde a las recetas filtradas según la condición de createdInDataBase.
          error: null, // Reinicia el estado de error a null
        };
    
        case ORDER_BY_NAME:
      let orderedArr =
        action.payload === "asc"
          ? state.recipes.sort(function (a, b) { //si es ascendente
              if (a.name > b.name) {
                return 1;
              }
              if (b.name > a.name) {
                return -1;
              }
              return 0;
            })
          : state.recipes.sort(function (a, b) { //si es descendente
              if (a.name > b.name) {
                return -1;
              }
              if (b.name > a.name) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        recipes: orderedArr,
        error: null, // Reinicia el estado de error a null
      };
   
    
    case ORDER_BY_SCORE:
      let sortedArr2 = state.recipes //Para realizar el ordenamiento en base a este arreglo sin modificar directamente el estado.
      if (action.payload === "notHealth")
        sortedArr2.sort((a, b) => a.healthScore - b.healthScore); //se aplica ascendente. Ordena de menor a mayor
      if (action.payload === "health")
        sortedArr2.sort((a, b) => b.healthScore - a.healthScore);
        return{
          ...state,
          recipes: sortedArr2
    }


    case GET_DETAILS:
      return{
        ...state,
        recipeDetail: action.payload
      } 
     
    case CLEAN_DATA:
      return {
        ...state,
        recipeDetail: {},
      }
    case ERROR_GET_RECIPES:
    case ERROR_GET_NAME_RECIPES:
    case ERROR_GET_DIETS:
    return {
        ...state,
        error: action.payload, // Actualiza el estado de error con el mensaje de error recibido
    };
    default:
      return state;
  }
};

export default rootReducer;

