import axios from "axios";

export const GET_RECIPES = "GET_RECIPES";
export const ERROR_GET_RECIPES = "ERROR_GET_RECIPES";
export const FILTER_BY_DIETS = "FILTER_BY_DIETS";
export const FILTER_CREATED = "FILTER_CREATED";
export const ORDER_BY_NAME = "ORDER_BY_NAME";
export const GET_NAME_RECIPES = "GET_NAME_RECIPES";
export const ERROR_GET_NAME_RECIPES= "ERROR_GET_NAME_RECIPES";
export const GET_DIETS = "GET_DIETS";
export const ERROR_GET_DIETS = "ERROR_GET_DIETS";
export const POST_RECIPES = "POST_RECIPES";


export const getRecipes = () => {
    return async function (dispatch) {
      try {
        const json = await axios.get(`http://localhost:3001/recipes`);
        dispatch({
          type: GET_RECIPES,
          payload: json.data,
        });
      } catch (error) {
        dispatch({
          type: ERROR_GET_RECIPES,
          payload: error.message,
        });
      }
    };
  };

export const getNameRecipes = (name) => {
    return async function (dispatch) {
      try {
        let json = await axios.get(`http://localhost:3001/recipes?name=${name}`);
        return dispatch({
          type: GET_NAME_RECIPES,
          payload: json.data,
        });
      } catch (error) {
        return dispatch({
          type: ERROR_GET_NAME_RECIPES,
          payload: error.message, 
        });
      }
    };
  };

  export const getDiets = () => {
    return async function (dispatch) {
      try {
        const info = await axios.get(`http://localhost:3001/diets`);
        dispatch({
          type: GET_DIETS,
          payload: info.data,
        });
      } catch (error) {
    console.log(error)
        };
      }
    };
  



  // export function postRecipes(payload) {
  //   return async function(dispatch) {
  //     const response = await axios.post(`http://localhost:3001/recipes`, payload);
  //     return  response
  //   };
  // }
  
  
export function filterRecipesByDiets(payload){
    return{
        type: FILTER_BY_DIETS,
        payload //el "payload" puede ser cualquier valor que se pase como argumento al llamar a esta acción
    }
}

export function filterCreated(payload) {
    return {
      type: FILTER_CREATED,
      payload //el "payload" puede ser cualquier valor que se pase como argumento al llamar a esta acción
    };
  }

  export function orderByName(payload){
    return {
        type: 'ORDER_BY_NAME',
        payload //el "payload" puede ser cualquier valor que se pase como argumento al llamar a esta acción
    }
}





