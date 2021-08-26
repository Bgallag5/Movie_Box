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
    rating: {
      type: DataTypes.DECIMAL,
    },
    genre: {
      type: DataTypes.STRING,
    },
    plot: {
      type: DataTypes.TEXT,
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
      // allowNull: false,
      defaultValue: false,
    },
    // genre_id: {
    //   //previously genre_id, but I don't think we need/want the Genre model
    //   type: DataTypes.INTEGER,
    // },
    //   // references: {
    //   //   model: "genre",
    //   //   key: "id",
    //   // },
    // },
    // poster: {
    //   type: DataTypes.BLOB,
    // },
    // plot: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    //   validate: {
    //     isUrl: true,
    //   },
    // },
  },
  {
    sequelize: sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "movie",
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
