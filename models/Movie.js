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
    type: DataTypes.DECIMAL,
  },
  genre: {
    type: DataTypes.STRING,
  },
  plot :{
    type: DataTypes.TEXT
  },
  poster_path: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  release_year: {
    type: DataTypes.INTEGER,
  },
  viewed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
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