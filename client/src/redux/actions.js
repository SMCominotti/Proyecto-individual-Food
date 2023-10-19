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
export const CLEAN_DATA = 'CLEAN_DATA';
export const GET_DETAILS = 'GET_DETAILS';
export const SET_LOADING = "SET_LOADING";
export const ORDER_BY_SCORE = "ORDER_BY_SCORE";

//Loading
export const setLoading = (isLoading) => {
  return {
    type: SET_LOADING,
    payload: isLoading,
  };
};

//getRecipes
export const getRecipes = () => {
    return async function (dispatch) {
      try {
        const json = await axios.get
        (`https://smak-cip5.onrender.com/recipes`)
        //(`http://localhost:3001/recipes`);
        dispatch({
          type: GET_RECIPES,
          payload: json.data,
        });
      } catch (error) {
       return dispatch({
          type: ERROR_GET_RECIPES,
          payload: error.message,
        });
      }
    };
  };

  //getName
export const getNameRecipes = (name) => {
    return async function (dispatch) {
      try {
        let json = await axios.get(`https://smak-cip5.onrender.com/recipes?name=${name}`);
        //(`http://localhost:3001/recipes?name=${name}`);
        return dispatch({
          type: GET_NAME_RECIPES,
          payload: json.data,
        });
      } catch (error) {
        alert(`No recipes found to match ${name}`)
        return dispatch({
          type: ERROR_GET_NAME_RECIPES,
          payload: error.message, 
        });
      }
    };
  };

//getDiets
  export const getDiets = () => {
    return async function (dispatch) {
      try {
        const info = await axios.get(`https://smak-cip5.onrender.com/diets`);
        return dispatch({
          type: GET_DIETS,
          payload: info.data,
        });
      } catch (error) {
    console.log(error)
        };
      }
    };
  
    //get details
    export const getDetails = (idRecipes) => {
      return async function (dispatch) {
        const response = await axios.get(`https://smak-cip5.onrender.com/recipes/${idRecipes}`);
        dispatch({
          type: GET_DETAILS,
          payload: response.data,
        });
      };
    };

    //remove (si quisera borrar desde el front) //Tengo que exportar  REMOVE_RECIP
        //get details
        // export const removeRecipes = (idRecipes) => {
        //   return async function (dispatch) {
        //  try{
        //     const response = await axios.get(`http://localhost:3001/recipes/${idRecipes}`);
        //     dispatch({
        //       type: REMOVE_RECIP,
        //       payload: response.data,
        //     });
        //   } catch (error) {
        //  console.log(error.message);
        // };
        //}
        //}

    //Clean Data
    export const cleanData = () => {
      return { type: CLEAN_DATA };
    };
 

    //post Recipes
    // export const postRecipes = (form) => {
    //   form.steps = form.steps.split(',').map((step) => step.trim()); 
    //Transformo steps, para dividir el valor en un arreglo de pasos, que están separados por comas. Luego con el método map() itero sobre cada paso y trim() para eliminar los espacios en blanco al principio y al final de cada paso. Los pasos modificados se asignan nuevamente a la propiedad steps del objeto form.
    //   return async (dispatch) => {
    //     const response = await axios.post(`http://localhost:3001/recipes`, form);
    //     return response;
    //   };
    // };
    
  
  //Filter diets
    export function filterRecipesByDiets(payload){
      return{
            type: FILTER_BY_DIETS,
            payload 
        }
    }

    //filter created
    export function filterCreated(payload) {
      return {
            type: FILTER_CREATED,
            payload 
      };
  }

  //filter order 
    export function orderByName(payload){
      return {
            type: ORDER_BY_NAME,
            payload 
      }
    }

    //filter score
    export function orderByScore(payload) {
      return {
          type: 'ORDER_BY_SCORE',
          payload
      }
  };






