const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  
  sequelize.define('diets', {
      name: {
          type: DataTypes.STRING,
          allowNull: false,
      },
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
    }
});
};