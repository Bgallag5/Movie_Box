// ani
const axios = require("axios").default;
const router = require("express").Router();
const aniKey = "43934c9963msh721330f251ef6dep1dc772jsn1442ece51420";
const Sequelize = require("sequelize");
const {Op} = Sequelize.Op;
const { User, Movie, UserFav, UserReview, Rating } = require("../../models");

//this went in the home-routes
// router.get('/', (req, res) => {
//   Movie.findAll({}).then(dbData => {
//     const movies = dbData.map(movie => movie.get({plain: true}));
//     console.log(movies);
//     res.render('index', {movies});
//   })
// })

router.get("/:id", (req, res) => {
  Movie.findOne({
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: UserReview,
        attributes: ["id", "title", "post_content", "movie_id", "user_id"],
        include: {
          model: User,
          attributes: ["id", "username"],
        },
      },
    ],
  })
    .then((dbData) => {
      res.json(dbData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Ani's get movie by title // this will be used to display the single view page // the other /search/:title returns all matching search params on the index page 
router.get("/title/:title", (req, res) => {
  let title = req.params.title.split("_").join(" ");
  console.log("LOOK HERE", title);

  Movie.findOne({
    where: {
      title: title,
    },
    include: [
      {
        model: UserReview,
        attributes: ["id", "title", "post_content", "user_id"],
        include: {
          model: User,
          attributes: ["id", "username"],
        },
      },
    ],
  })
    .then((dbMovieData) => {
      if (!dbMovieData) {
        res
          .status(404)
          .json({ message: "We can't find a movie called this. 🙁" });
        return;
      }
      res.json(dbMovieData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});


//get a movie based on an imdb search
///return response object from imdb

router.get("/find/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let request_options = Object.assign({}, options_details); //cloning object
    request_options.params.tconst = id;
    let results = await axios.request(request_options);

    res.send(results.data);
  } catch (error) {
    console.error(error?.data); //if data is undefined, return undefined
    res.status(500).send("failed to fect data");
  }
});

//get all movies

router.get("/", (req, res) => {
  Movie.findAll({
    attributes: ["id", "title", "year", "poster", "plot"],
    include: [
      {
        model: Genre,
        attributes: ["id", "genre_name"],
      },
    ],
  })
    .then((dbMovieData) => res.json(dbMovieData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// const searchMovies = function (title) {  
//   // var searchTerm = document.getElementById('inputId');
//   ///return all moveis that match search params 
//   console.log(title); 

// router.get(`/title/${title}`, (req, res) => {
//   // let title = req.params.title.split("_").join(" ");
//   // console.log("LOOK HERE", title);

//   Movie.findOne({
//     where: {
//       title: title,
//     },
//     include: [
//       {
//         model: UserReview,
//         attributes: ["id", "title", "post_content", "user_id"],
//         include: {
//           model: User,
//           attributes: ["id", "username"],
//         },
//       },
//     ],
//   })
//     .then((dbMovieData) => {
//       if (!dbMovieData) {
//         res
//           .status(404)
//           .json({ message: "We can't find a movie called this. 🙁" });
//         return;
//       }
//       res.json(dbMovieData);
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json(err);
//     });
// });
// }


////GET BY GENRE
router.get('/filter/:genre', (req, res) => {
  Movie.findAll({ 
    where: {
      genre: req.params.genre
    }
  }).then(dbData => {
    const movies = dbData.map(movie => movie.get({plain: true}));
    console.log(movies);
    res.render('index', {movies});
  })
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
});


////GET BY BEST
router.get('/filter/best', (req, res) => {
  console.log('==========HIT BEST API ROUTE============');
  Movie.findAll({ 
    where: {
      rating: {
       [Op.between]: [8, 10],
      }
    }
  }).then(dbData => {
    const movies = dbData.map(movie => movie.get({plain: true}));
    console.log(movies);
    res.render('index', {movies});
  })
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
});


///GET BY TITLE
router.get('/search/:title', (req, res) => {
  console.log("HIT API ROUTES, TITLE:") 
  let title = req.params.title
 console.log(title);

  Movie.findAll({ 
      where: {
        title: this.includes(title)
          // title: sequelize.where(sequelize.fn('LOWER', sequelize.col('title')), 'LIKE', '%' + title + '%')
      }
  }).then(dbData => {
    console.log(dbData);
    if (!dbData){
      res.status(404).json({ message: "We can't find a movie called this. 🙁" })
    }
    const movies = dbData.map(movie => movie.get({plain: true}));
    console.log(movies);
    res.render('index', {movies});
  })
  .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
// module.exports = searchMovies;


