const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const bcrypt = require("bcrypt");

class Rating extends Model {}

Rating.init(
  {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    movie_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    // favorites: {
    //   type: DataTypes.ARRAY,
    // },
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: "rating",
  }
);

module.exports = Rating;
