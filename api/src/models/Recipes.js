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
        allowNull: false,
        validate: {
          isUrl:true,
        }
       },
       summary:{
        type: DataTypes.TEXT,
        allowNull: false,
       },
       healthScore:{
        type: DataTypes.FLOAT,
        allowNull: false,
       },
       steps: {
        type: DataTypes.ARRAY(DataTypes.JSON),
        
      },
       createdInDataBase: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    },
  },{timestamps:false});
};
