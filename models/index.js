//importing all models
const User = require("./User");
const UserReview = require("./UserReview");
const Movie = require("./Movie");
const Genre = require("./Genre");
const UserFav = require("./UserFav");
const Rating = require("./Rating");

//make associations
// User.hasMany(Post, {
//     foreignKey: 'user_id'
// });

// User.hasMany(UserFav, {
//   foreignKey: "user_id",
//   //   through: { UserFav },
// });

// Movie.hasMany(User, {
//   foreignKey: "user_id",
//   //   through: { UserFav },
// });

// Movie.belongsTo(Post, {
//     foreignKey: 'post_id'   // I think movie should belong to post?
// })

// Post.belongsTo(User, {
//     foreignKey: 'user_id',
//     onDelete: 'SET NULL'
// });

UserReview.belongsTo(User, {
  foreignKey: "user_id",
});

User.hasMany(UserReview, {
  foreignKey: "user_id",
});

Movie.belongsTo(Genre, {
  foreignKey: "genre_id",
});

Genre.hasMany(Movie, {
  foreignKey: "genre_id",
});

// Movie.hasMany(Genre, {
//     foreignKey: 'movie_id',

// });  // i mean movies do sometimes fall under several genres tho...

module.exports = {
  User,
  UserReview: UserReview,
  Movie,
  Genre,
  UserFav,
  Rating,
};
