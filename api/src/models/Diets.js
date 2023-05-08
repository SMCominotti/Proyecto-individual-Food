const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  
  sequelize.define('diets', {
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
    created: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
},{timestamps:false});
};