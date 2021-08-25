const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const bcrypt = require("bcrypt");

class Movie extends Model {}

Movie.init(
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
    year: {
      type: DataTypes.INTEGER,
    },
    // viewed: {
    //   type: DataTypes.BOOLEAN,
    // },
    // genre_id: {
    //   //previously genre_id, but I don't think we need/want the Genre model
    //   type: DataTypes.STRING,

    //   // references: {
    //   //   model: "genre",
    //   //   key: "id",
    //   // },
    // },
    poster: {
      type: DataTypes.BLOB,
    },
    plot: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUrl: true,
      },
    },
  },
  {
    sequelize: sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "Movie",
  }
);

//     title: {
//         type: DataTypes.STRING,
//         allowNull: false,
//     },

//             rating: {
//             type: DataTypes.STRING
//         }

//   }
// });

module.exports = Movie;
