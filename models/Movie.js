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
    type: DataTypes.STRING,
  },
  viewed: {
    type: DataTypes.BOOLEAN,
  },
  genre_id: {
    type: DataTypes.INTEGER,
    references: {
      model: "genre",
      key: "id",
    },
  },
  sequelize,
  timestamps: false,
  freezeTableName: true,
  underscored: true,
  modelName: "movie",
});

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