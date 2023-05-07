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
        type: DataTypes.UUID,
        autoincrement: true,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
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
       stepByStep: {
        type: DataTypes.JSON,
       }
  });
};
