const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const bcrypt = require("bcrypt");

class UserFav extends Model {}

UserFav.init(
  {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "user",
        key: "id",
      },
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
    genre: {
      type: DataTypes.STRING,
      references: {
        model: "movie",
        key: "genre",
      },
    },
    rating: {
      type: DataTypes.DECIMAL,
      references: {
        model: "movie",
        key: "rating",
      },
    },
    release_year: {
      type: DataTypes.INTEGER,
      references: {
        model: "movie",
        key: "release_year",
      },
    },
    plot: {
      type: DataTypes.STRING,
      references: {
        model: "movie",
        key: "plot",
      },
    },
    poster_path: {
      type: DataTypes.STRING,
      // validate: {
      //   isUrl: true,
      // },
    },
    viewed: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
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
