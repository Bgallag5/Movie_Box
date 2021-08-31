const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const bcrypt = require("bcrypt");

class UserReview extends Model {}

UserReview.init(
  {
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
    post_content: {
      type: DataTypes.STRING,
      validate: {
        len: [2, 200],
      },
      allowNull: false,
    },
    movie_id: {
      type: DataTypes.INTEGER,
      // allowNull: false,
      references: {
        model: "movie",
        key: "id",
      },
      // allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
      allowNull: false, //must always reference a user so never can be null
    },
  },
  {
    sequelize: sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "userreview",
  }
);

module.exports = UserReview;
