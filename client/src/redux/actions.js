import axios from "axios";


export const GET_RECIPES = "GET_RECIPES";
export const FILTER_BY_DIETS = "FILTER_BY_DIETS";
export const FILTER_CREATED = "FILTER_CREATED";
export const ORDER_BY_NAME = "ORDER_BY_NAME";
//export const GET_RECIPE= "GET_RECIPE";

export const getRecipes = () =>{
    return async function(dispatch){
        try {
            const json= await axios.get(`http://localhost:3001/recipes`);
            dispatch({
                type: GET_RECIPES, 
                payload: json.data
            })
        } catch (error) {
            console.log("Error: " + error.message)
        }
         
    };
};

export function filterRecipesByDiets(payload){
    return{
        type: FILTER_BY_DIETS,
        payload
    }
}

export function filterCreated(payload) {
    return {
      type: FILTER_CREATED,
      payload
    };
  }

  export function orderByName(payload){
    return {
        type: 'ORDER_BY_NAME',
        payload
    }
}


// export const getRecipe = (idRecipes) => {
//     return async function (dispatch) {
//       let json = await axios.get(`http://localhost:3001/recipes/${idRecipes}`);
//       return dispatch({
//         type: GET_RECIPE,
//         payload: json.data
//       });
//     };
//   };
  



