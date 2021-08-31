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
      unique: true,
      allowNull: false,
    },
    release_year: {
      type: DataTypes.INTEGER,
    },
  },

  {
    sequelize: sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "movie",
  }
);

module.exports = Movie;

// const { Model, DataTypes } = require("sequelize");
// const sequelize = require("../config/connection");
// const bcrypt = require("bcrypt");
// // class Movie extends Model {}

// const Movie = (sequelize, DataTypes) => {
//   const Movie = sequelize.define(
//     "movie",
//     {
//       id: {
//         autoIncrement: true,
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         primaryKey: true,
//       },
//       title: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
//       rating: {
//         type: DataTypes.DECIMAL,
//       },
//       genre: {
//         type: DataTypes.STRING,
//       },
//       plot: {
//         type: DataTypes.TEXT,
//       },
//       poster_path: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         unique: true,
//         // validate: {
//         //   isUrl: true,
//         // },
//       },
//       release_year: {
//         type: DataTypes.INTEGER,
//       },
//       // user_id: {
//       //   type: DataTypes.INTEGER,
//       //   references: {
//       //     model: "user",
//       //     keys: "id",
//       //   },
//       // },
//       viewed: {
//         type: DataTypes.BOOLEAN,
//         // allowNull: false,
//         defaultValue: false,
//       },
//       // genre_id: {
//       //   //previously genre_id, but I don't think we need/want the Genre model
//       //   type: DataTypes.INTEGER,
//       // },
//       //   // references: {
//       //   //   model: "genre",
//       //   //   key: "id",
//       //   // },
//       // },
//       // poster: {
//       //   type: DataTypes.BLOB,
//       // },
//       // plot: {
//       //   type: DataTypes.STRING,
//       //   allowNull: false,
//       //   validate: {
//       //     isUrl: true,
//       //   },
//       // },
//     },
//     { indexes: [{ unique: true, fields: ["poster_path"] }] }
//     /* {
//     sequelize: sequelize,
//     timestamps: false,
//     freezeTableName: true,
//     underscored: true,
//     modelName: "movie",
//   }*/
//   );
//   return Movie;
// };

// module.exports = Movie;
