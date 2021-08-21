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
    type: DataTypes.INTEGER,
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
  poster_url: {
    type: DataTypes.BLOB,
  },
  imdb_url: {
    type: DataTypes.STRING, 
    allowNull: false,
    validate: {
      isUrl: true
    }
  }
}, 
  {
  sequelize: sequelize,
  timestamps: false,
  freezeTableName: true,
  underscored: true,
  modelName: "Movie"
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