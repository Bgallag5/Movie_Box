const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const bcrypt = require("bcrypt");
// const { Movie, UserFav, UpVote, User } = require("./models");

// class UserFav extends Model {}


// {
//   static Vote(body, models) {
//     return models.UpVote.create({
//       user_id: body.user_id,
//       movie_id: body.movie_id,
//     }).then(() => {
//       return Movie.findOne({
//         where: {
//           id: body.movie_id,
//         },
//         attributes: [
//           "id",
//           "title",
//           "rating",
//           "genre",
//           "plot",
//           "poster_path",
//           "release_year",
//           "user_id",
//           [
//             sequelize.literal(
//               "(SELECT COUNT(*) FROM UpVote WHERE movie.id = UpVote.movie_id)"
//             ),
//             "UpVote_count",
//           ],
//         ],
//         include: [
//           {
//             model: models.UserReview,
//             attributes: ["id", "title", "post_content", "movie_id", "user_id"],
//             include: {
//               model: models.User,
//               attributes: ["username"],
//             },
//           },
//         ],
//       });
//     });
//   }
// }

// UserFav.init(
//   {
//     user_id: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       references: {
//         model: "user",
//         key: "id",
//       },
//     },
//     movie_id: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       references: {
//         model: "movie",
//         key: "id",
//       },
//     },
//     title: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       validate: {
//         len: [2, 50],
//       },
//     },
//     genre: {
//       type: DataTypes.STRING,
//       references: {
//         model: "movie",
//         key: "genre",
//       },
//     },
//     rating: {
//       type: DataTypes.DECIMAL,
//       references: {
//         model: "movie",
//         key: "rating",
//       },
//     },
//     release_year: {
//       type: DataTypes.INTEGER,
//       references: {
//         model: "movie",
//         key: "release_year",
//       },
//     },
//     plot: {
//       type: DataTypes.STRING,
//       references: {
//         model: "movie",
//         key: "plot",
//       },
//     },
//     poster_path: {
//       type: DataTypes.STRING,
//       // validate: {
//       //   isUrl: true,
//       // },
//     },
//     viewed: {
//       type: DataTypes.BOOLEAN,
//       defaultValue: true,
//     },

//     // genre: {
//     //   references: {
//     //     model: "movie",
//     //     key: "genre",
//     //   },
//     // },
//     // favorites: {
//     //   type: DataTypes.ARRAY,
//     // },
//   },
//   {
//     sequelize,
//     timestamps: false,
//     freezeTableName: true,
//     underscored: true,
//     modelName: "userfav",
//   }
// );

// module.exports = UserFav;

UserFav.init(
  {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    favorites: {      ////favorites are TITLES OF FAVORITE MOVIES stored in string, to be called in loop { Movie.findOne(where title = title)}; res.render('single-view')
      type: DataTypes.STRING,     ////also JSON might work?
      allowNull: false,
      get() {
        return this.getDataValue('favorites').split(';')
      },
      set(val) {
        this.setDataValue('favorites', val.join(';'));
      }
    },
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


////i think UserFav should just be an Array of Movie models? only have user_id and favorites: Array

