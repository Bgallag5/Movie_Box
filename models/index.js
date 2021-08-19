//importing all models
const User = require('./User');
const Post = require('./Post');
const Movie = require ('./Movie');
const Genre = require ('./Genre');

//make associations 
User.hasMany(Post, {
    foreignKey: 'user_id'
});

User.hasMany(Movie, {
    // set foreign key to user?
    foreignKey: 'user_id'
});

Movie.belongsTo(User, {
    foreignKey: 'user_id'
});

Post.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'SET NULL'
});

Movie.belongsTo(Genre, {
    foreignKey: 'genre_id',
    onDelete: 'SET NULL'
});

// Movie.hasMany(Genre, {
//     foreignKey: 'movie_id',

// });  // i mean movies do sometimes fall under several genres tho...

Genre.hasMany(Movie, {
    foreignKey: 'genre_id'
});


module.exports = { User, Post, Movie, Genre };
