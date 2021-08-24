const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const bcrypt = require("bcrypt");

class Movie extends Model { }

Movie.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  rating: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  genre: {
    type: DataTypes.STRING,
  },
  plot :{
    type: DataTypes.STRING(15000),
  },
  poster_path: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  release_year: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, 
  {
  sequelize: sequelize,
  timestamps: false,
  freezeTableName: true,
  underscored: true,
  modelName: "Movie"
  });





module.exports = Movie;