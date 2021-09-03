const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Fave extends Model {}

Fave.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
    },
    movie_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "movie",
        key: "id",
      },
    },
    // title: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    //   references: {
    //     model: "movie",
    //     key: "title",
    //   },
    // },

    /* poster_path: {
      type: DataTypes.STRING,
      allowNull: false
       references: {
        model: "movie",
        key: "poster_path",
      },

    }*/
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "fave",
  }
);

module.exports = Fave;
