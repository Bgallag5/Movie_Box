//importing all models
const User = require("./User");
const UserReview = require("./UserReview");
const Movie = require("./Movie");
const UserFav = require("./UserFav");
const Vote = require("./Vote");

//make associations
Movie.hasMany(UserReview, {
  foreignKey: "user_id",
  onDelete: "SET NULL",
});

UserFav.belongsTo(Movie),
  {
    foreignKey: "movie_id",
  };

User.hasMany(UserFav, {
  foreignKey: "user_id",
});

User.belongsToMany(Movie, {
  through: UserFav,
  // as: "voted_posts",
  foreignKey: "user_id",
});

Movie.hasMany(UserReview, {
  foreignKey: "user_id",
});

UserFav.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "SET NULL",
});

UserReview.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "SET NULL",
});

// UserFav.belongsToMany(Movie, {
//   foreignKey: "user_id",
//   onDelete: "SET NULL",
// });

User.hasMany(UserReview, {
  foreignKey: "user_id",
});

module.exports = {
  User,
  UserReview: UserReview,
  Movie,
  UserFav,
  Vote,
};
