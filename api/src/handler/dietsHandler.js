//AQUI IMPORTAMOS CONTROLADORES
const getAllDiets = require('../controllers/diets/getAllDiets');

const getDiets = async(req,res) => {
    try {
        const response= await getAllDiets();
        res.status(200).json(response)
    } catch (error) {
        res.status(400).json({error: error.message, description:"error en getDiets"})
    }
}

module.exports = {
    getDiets,
   };

 // getDiet,
    // postDiets,
    // putDiets,
    // deleteDiets,
   //___________________________________________________________

// const getDiet = async(req,res) => {
//     const {id} = req.params;
//     try {
//         const response = await getAllDiets(id) 
//         res.status(200).json(response)
//     } catch (error) {
//         //aquí está el error
//         res.status(400).json({error: error.message, description:"error en getDiet"})
//     }
// }



// const postDiets = async() => {
//     try {
//         // aquí salió todo bien
//         const diets = {};
//         res.status(200).json(diets)
//     } catch (error) {
//         //aquí está el error
//         res.status(400).json({error: error.message, description:"error en postDiets"})
//     }
// }

// const putDiets = async(req,res) => {
//     try {
//         // aquí salió todo bien
//         const diets = {};
//         res.status(200).json(diets)
//     } catch (error) {
//         //aquí está el error
//         res.status(400).json({error: error.message, description:"error en putDiets"})
//     }
// }

// const deleteDiets = async(req,res) => {
//     try {
//         // aquí salió todo bien
//         const diets = {};
//         res.status(200).json(diets)
//     } catch (error) {
//         //aquí está el error
//         res.status(400).json({error: error.message, description:"error en deleteDiets"})
//     }
// }

module.exports = {
    getDiets,
    // getDiet,
    // postDiets,
    // putDiets,
    // deleteDiets,
};