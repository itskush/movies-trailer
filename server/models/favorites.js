'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Favorites extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // associations can be defined here
      Favorites.belongsTo(models.User, {
        foreignKey: 'userId',
        onDelete: 'CASCADE'
      })
    }
  };
  Favorites.init({
    userid: DataTypes.INTEGER,
    movieid: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Favorites',
  });
  return Favorites;
};
