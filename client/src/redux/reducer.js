const initialState={  //este es el estado global al ppio de la aplicación.
    recipes:[ {
        "id": 782585,
        "name": "Cannellini",
        "image": "https://spoonacular.com/recipeImages/782585-312x231.jpg",
        "summary": "Cannellini Bean and Asparagus",
        "healthScore": 100,
        "steps": [
          {
            "number": 1,
            "step": "Rinse the"
          },
          {
            "number": 2,
            "step": "Drain and rinse"
          },
          ]},
          {
              "id": 782586,
              "name": "Cannellini",
              "image": "https://spoonacular.com/recipeImages/782585-312x231.jpg",
              "summary": "Cannellini Bean and Asparagus",
              "healthScore": 100,
              "steps": [
                {
                  "number": 1,
                  "step": "Rinse the"
                },
                {
                  "number": 2,
                  "step": "Drain and rinse"
                },
                ]},
                {
                  "id": 782587,
                  "name": "Cannellini",
                  "image": "https://spoonacular.com/recipeImages/782585-312x231.jpg",
                  "summary": "Cannellini Bean and Asparagus",
                  "healthScore": 100,
                  "steps": [
                    {
                      "number": 1,
                      "step": "Rinse the"
                    },
                    {
                      "number": 2,
                      "step": "Drain and rinse"
                    },
                    ]}
            ]
};

//esta parte de recipes esta harcodeada por ahora
 
   
const rootReducer=(state=initialState, action) =>{
    switch(action.type){
        default:
            return{...state}
    }
};

export default rootReducer;
