// const sequelize = require('../config/connection')
const Movie = require('../models/Movie');



const movies = [
    {
        title: 'The Lion King',
        rating: 9,
        genre: 'Family',
        plot: 'A family of lions get up to some real shit',
        poster_path: 'https://images.moviesanywhere.com/c07276e9473360730fdbc94baebc4236/4692c964-61ba-486d-9c77-939dbfba2f07.jpg', 
        release_year: 1994,
    },
    {
        title: 'Forrst Gump',
        rating: 8.50,
        genre: 'Drama',
        plot: 'Forrest goes everywhere',
        poster_path: 'https://m.media-amazon.com/images/I/81xTx-LxAPL._SL1500_.jpg',
        release_year: 1994,
    },
    {
        title: 'Kill Bill: Vol. 1',
        rating: 7.90,
        genre: 'Action',
        plot: 'An assassin is shot by her ruthless employer, Bill, and other members of their assassination circle – but she lives to plot her vengeance.',
        poster_path: '/v7TaX8kXMXs5yFFGR41guUDNcnB.jpg',
        release_year: 2003,
    },
    {
        title: 'Pulp Fiction',
        rating: 8.40,
        genre: 'Action',
        plot: "A burger-loving hit man, his philosophical partner, a drug-addled gangster's moll and a washed-up boxer converge in this sprawling, comedic crime caper. Their adventures unfurl in three stories that ingeniously trip back and forth in time.",
        poster_path: '/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg',
        release_year: 1994,
    },
    {
        title: 'Inglourious Basterds',
        rating: 8.2,
        genre: 'Action',
        plot: "In Nazi-occupied France during World War II, a group of Jewish-American soldiers known as 'The Bastards' are chosen specifically to spread fear throughout the Third Reich by scalping and brutally killing Nazis. The Basterds, lead by Lt. Aldo Raine soon cross paths with a French-Jewish teenage girl who runs a movie theater in Paris which is targeted by the soldiers.",
        poster_path: "/7sfbEnaARXDDhKm0CZ7D7uc2sbo.jpg",
        release_year: 2009,
    },
    {
        title: 'Jackie Brown',
        rating: 7.35,
        genre: 'Drama',
        plot: "Jackie Brown is a flight attendant who gets caught in the middle of smuggling cash into the country for her gunrunner boss. When the cops try to use Jackie to get to her boss, she hatches a plan — with help from a bail bondsman — to keep the money for herself.",
        poster_path: "ewbLUXvm4riZL0aepy90o0vMesn.jpg",
        release_year: 1997,
    },
];

const seedMovies = () => Movie.bulkCreate(movies)
seedMovies();

module.exports= seedMovies;