import { GET_RECIPES } from "./actions";



const initialState= {  //este es el estado global al ppio de la aplicación.
    recipes:[],
};

//esta parte de recipes esta harcodeada por ahora
 
   
const rootReducer=(state=initialState, action) =>{
    switch(action.type){
        case GET_RECIPES:
          return {
            ...state, 
            recipes: action.payload
          }
         
    default:
        return state
    }
};

export default rootReducer;
