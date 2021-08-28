const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const bcrypt = require("bcrypt");

class UserFav extends Model {}

UserFav.init(
  {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    movie_id: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: "movie",
        key: "id",
      },
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2, 50],
      },
    },
    // genre: {
    //   references: {
    //     model: "movie",
    //     key: "genre",
    //   },
    // },
    // favorites: {
    //   type: DataTypes.ARRAY,
    // },
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: "userfav",
  }
);

module.exports = UserFav;
