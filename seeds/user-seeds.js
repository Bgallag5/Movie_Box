const User = require('../models/User');


const users = [
    
    {
        username: 'moviereviewer420',
        password: 'password1234',
        email: 'myemail@gmail.com'
    },
    {
        username: 'bentasmo',
        password: 'password5678',
        email: 'bgallag5@gmail.com'
    },
];

const seedUsers = () => User.bulkCreate(users);
// seedUsers();

module.exports = seedUsers;