const seedMovies = require("./movie-seeds");
const seedUsers = require("./user-seeds");

const sequelize = require("../config/connection");

const runSeeds = async () => {
  await sequelize.sync({ force: false });
  console.log("<<<<<DATABASE SYNCED>>>>>");
  await seedMovies();
  console.log("<<<<<MOVIES SEEDED>>>>>");
  await seedUsers();
  console.log("<<<<<USERS SEEDED>>>>>");
  process.exit(0);
};

runSeeds();
