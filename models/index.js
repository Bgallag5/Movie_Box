//importing all models
const User = require("./User");
const UserReview = require("./UserReview");
const Movie = require("./Movie");
const UserFav = require("./UserFav");

//make associations
Movie.hasMany(UserReview, {
  foreignKey: "user_id",
});

UserFav.belongsTo(Movie),
  {
    foreignKey: "movie_id",
  };

// User.hasMany(UserFav, {
//   foreignKey: "user_id",
//   //   through: { UserFav },
// });

UserFav.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "SET NULL",
});

UserReview.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "SET NULL",
});

User.hasMany(UserReview, {
  foreignKey: "user_id",
});

module.exports = {
  User,
  UserReview: UserReview,
  Movie,

  UserFav,
};
