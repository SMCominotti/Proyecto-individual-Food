import { SET_LOADING, GET_RECIPES, FILTER_BY_DIETS, FILTER_CREATED, ORDER_BY_NAME, ERROR_GET_RECIPES, ERROR_GET_NAME_RECIPES, GET_NAME_RECIPES, ERROR_GET_DIETS ,GET_DIETS, CLEAN_DATA, GET_DETAILS } from "./actions";

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
        loading: action.payload,
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
 //   return {
//       ...state,
//   }
        
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
      const allRecipes2 = state.allRecipes;
      const createdFilter =
        action.payload === "createdInDataBase"
          ? allRecipes2.filter((element) => element.createdInDataBase)
          : allRecipes2.filter((element) => !element.createdInDataBase);
        return {
          ...state,
          recipes: action.payload === "all" ? allRecipes2 : createdFilter,
          error: null, // Reinicia el estado de error a null
        };
    case ORDER_BY_NAME:
      let orderedArr =
        action.payload === "asc"
          ? state.recipes.sort(function (a, b) {
              if (a.name > b.name) {
                return 1;
              }
              if (b.name > a.name) {
                return -1;
              }
              return 0;
            })
          : state.recipes.sort(function (a, b) {
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

