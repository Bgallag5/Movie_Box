
const User = require("../models/User");

const users = [
  {
    username: "moviereviewer420",
    email: "myemail@gmail.com",
    password: "password1234",
  },
  {
    username: "bentasmo",
    email: "bgallag5@gmail.com",
    password: "password5678",
  },

];

const seedUsers = () => User.bulkCreate(users);
// seedUsers();


module.exports = seedUsers;

