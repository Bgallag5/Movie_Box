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

Fave.belongsTo(Movie,
  {
    foreignKey: "movie_id",
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

Fave.belongsTo(User, {
  foreignKey: "user_id",
  // onDelete: "SET NULL",
});

UserReview.belongsTo(User, {
  foreignKey: "user_id",
  // onDelete: "SET NULL",
});


User.hasMany(UserReview, {
  foreignKey: "user_id",
});

/////I WAS GETTING ERRORS WITH THIS ASSOCIATION
// User.belongsToMany(Movie, {
//   through: UserReview,
//   foreignKey: "movie_id",
//   // onDelete: "SET NULL",
// });

UserReview.belongsTo(Movie, {
  foreignKey: 'movie_id'
})


// Fave.belongsToMany(Movie, {
//   foreignKey: "user_id",
//   onDelete: "SET NULL",
// });


module.exports = {
  User,
  UserReview,
  Movie,
  Fave,
};

