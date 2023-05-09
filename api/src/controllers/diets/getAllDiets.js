const axios = require ('axios')
require('dotenv').config();
const {API_KEY} = process.env;
const {Diets} = require ('../../db')
const getAllRecipes = require('../recipes/getAllRecipes')

module.exports= async () =>{
const info= await getAllRecipes()
const diets= info.map(element => element.diets).flat();
const temp= [... new Set(diets)]
const response = temp.filter(e=> e!== undefined)
return (response)
}
