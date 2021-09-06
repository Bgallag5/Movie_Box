//importing all models
const User = require("./User");
const UserReview = require("./UserReview");
const Movie = require("./Movie");
const Fave = require("./Fave");

//make associations
Movie.hasMany(UserReview, {
  foreignKey: "user_id",
  // onDelete: "SET NULL",
});


Fave.belongsTo(Movie, {
    foreignKey: "movie_id",
});
  
Fave.belongsTo(User, {
    foreignKey: "user_id",
    // onDelete: "SET NULL",
});

User.hasMany(Fave, {
  foreignKey: "user_id",
});

User.belongsToMany(Movie, {
  through: Fave,
  // as: "voted_posts",
  foreignKey: "user_id",
});

Movie.hasMany(UserReview, {
  foreignKey: "movie_id", // just changed from user_id
});


UserReview.belongsTo(User, {
  foreignKey: "user_id",
  // onDelete: "SET NULL",
});


User.hasMany(UserReview, {
  foreignKey: "user_id",
});

UserReview.belongsTo(Movie, {
  foreignKey: "movie_id"
})



module.exports = {
  User,
  UserReview,
  Movie,
  Fave,
};
