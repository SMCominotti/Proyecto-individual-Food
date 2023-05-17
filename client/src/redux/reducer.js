import { GET_RECIPES, FILTER_BY_DIETS, FILTER_CREATED, ORDER_BY_NAME} from "./actions";



const initialState= {  //este es el estado global al ppio de la aplicación.
    recipes:[], //recetas que se muestran en la aplicacion
    allRecipes:[],//todas las del servidor
};
   
const rootReducer=(state=initialState, action) =>{
    switch(action.type){
        case GET_RECIPES:
          return {
            ...state, 
            recipes: action.payload,
            allRecipes: action.payload
          }
        case FILTER_BY_DIETS:
            const allRecipes= state.allRecipes
            const dietsFiltered= 
            action.payload === 'All' 
            ? allRecipes
            : allRecipes.filter((recipe) => 
            recipe.diets.includes(action.payload)
            );
            return{
                ...state,
                recipes: dietsFiltered
            }
            case FILTER_CREATED:
                const allRecipes2 = state.allRecipes;
                const createdFilter = action.payload === 'createdInDataBase' ? allRecipes2.filter( element => element.createdInDataBase) : allRecipes2.filter( element => !element.createdInDataBase);
                return {
                    ...state,
                    recipes: action.payload === 'all' ? allRecipes2 : createdFilter
                }
                case ORDER_BY_NAME:
                    let orderedArr = action.payload === 'asc' ? 
                    state.recipes.sort(function(a,b){
                        if(a.name > b.name){
                            return 1;
                        }
                        if(b.name > a.name){
                            return -1;
                        }
                        return 0;
                    }) : state.recipes.sort(function(a,b){
                        if(a.name > b.name){
                            return -1;
                        }
                        if(b.name > a.name){
                            return 1;
                        }
                        return 0;
                    })
                    return {
                        ...state,
                        recipes: orderedArr
                    }    
    default:
        return state
    }
};

export default rootReducer;

