const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const bcrypt = require("bcrypt");

class Genre extends Model { }

Genre.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },

  genre_name: {
    type: DataTypes.STRING,
  } 
}
  , 
{
  sequelize: sequelize,
  timestamps: false,
  freezeTableName: true,
  underscored: true,
  modelName: "genre",
});




module.exports = Genre;