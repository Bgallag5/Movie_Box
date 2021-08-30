//importing all models
const User = require("./User");
const UserReview = require("./UserReview");
const Movie = require("./Movie");
const UserFav = require("./UserFav");

// //make associations
// Movie.hasMany(UserReview, {
//   foreignKey: "user_id",
// });

// UserFav.belongsTo(Movie,
//   {
//     foreignKey: "movie_id",
//   });

// Movie.hasMany(UserFav, {
//   foreignKey: "movie_id",
// });
// // User.hasMany(UserFav, {
// //   foreignKey: "user_id",
// //   //   through: { UserFav },
// // });

// // Movie.belongsTo(Post, {
// //     foreignKey: 'post_id'   // I think movie should belong to post?
// // })

// // Post.belongsTo(User, {
// //     foreignKey: 'user_id',
// //     onDelete: 'SET NULL'
// // });

// // Movie.belongsTo(Genre, {
// //   foreignKey: "genre_id",
// // });

// // Genre.hasMany(Movie, {
// //   foreignKey: "genre_id",
// // });

// // // Movie.hasMany(Genre, {
// // //     foreignKey: 'movie_id',

// UserFav.belongsTo(User, {
//   foreignKey: "user_id",
// });

// UserReview.belongsTo(User, {
//   foreignKey: "user_id",
// });

// User.hasMany(UserReview, {
//   foreignKey: "user_id",
// });


module.exports = { User, Movie, UserFav, UserReview};

