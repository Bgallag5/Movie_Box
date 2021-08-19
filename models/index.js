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
    
    foreignKey: 'user_id'
});

Movie.belongsTo(User, {
    foreignKey: 'user_id'
});

Movie.belongsTo(Post, {
    foreignKey: 'post_id'   // I think movie should belong to post? 
})

Post.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'SET NULL'
});

Movie.belongsTo(Genre, {
    foreignKey: 'genre_id',
    
});

Genre.hasMany(Movie, {
    foreignKey: 'genre_id'
});

// Movie.hasMany(Genre, {
//     foreignKey: 'movie_id',

// });  // i mean movies do sometimes fall under several genres tho...




module.exports = { User, Post, Movie, Genre };
