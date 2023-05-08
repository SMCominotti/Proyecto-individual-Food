const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipes', {
      name: {
          type: DataTypes.STRING,
          allowNull: false,
      },
      id: {
        type: DataTypes.UUID,  //de esta forma no se va a pisar con los ID de la API
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,//se van a crear automaticamente cuando creo una dieta
        allowNull: false,
      },
       image:{
        type: DataTypes.STRING,
        validate: {
          isUrl:true,
        }
       },
       summary:{
        type: DataTypes.TEXT,
       },
       healtScore:{
        type: DataTypes.FLOAT,
       },
       step: {
        type: DataTypes.JSON,
       },
       created: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
  },{timestamps:false});
};
