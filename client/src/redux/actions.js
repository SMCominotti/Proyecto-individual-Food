import axios from "axios";


export const GET_RECIPES = "GET_RECIPES";
//export const GET_RECIPE= "GET_RECIPE";

export const getRecipes = () =>{
    return async function(dispatch){
        try {
            const json= await axios.get(`http://localhost:3001/recipes`);
            dispatch({type: GET_RECIPES, payload: json.data})
        } catch (error) {
            console.log("Error: " + error.message)
        }
         
    };
};

// export const getRecipe = (idRecipes) => {
//     return async function (dispatch) {
//       let json = await axios.get(`http://localhost:3001/recipes/${idRecipes}`);
//       return dispatch({
//         type: GET_RECIPE,
//         payload: json.data
//       });
//     };
//   };
  



