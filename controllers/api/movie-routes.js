////start  ani's code /////////////////////////
var axios = require("axios").default;
const router = require("express").Router();
const aniKey = "43934c9963msh721330f251ef6dep1dc772jsn1442ece51420";
const { User, Post, Genre, Movie, UserFav, Rating } = require("../../models");

var options = {
  method: "GET",
  url: "https://imdb8.p.rapidapi.com/title/find/",
  params: { q: "Toy Story" },
  headers: {
    "x-rapidapi-host": "imdb8.p.rapidapi.com",
    "x-rapidapi-key": "43934c9963msh721330f251ef6dep1dc772jsn1442ece51420",
  },
};

var options_details = {
  method: "GET",
  url: "https://imdb8.p.rapidapi.com/title/get-details", //gets the id  and other details
  params: { tconst: "tt0944947" },
  headers: {
    "x-rapidapi-host": "imdb8.p.rapidapi.com",
    "x-rapidapi-key": "43934c9963msh721330f251ef6dep1dc772jsn1442ece51420",
  },
};

//
/**
 * @DESCRIPTION route to search for a movies get title : NOTE, REPLACE whitespace with underscore
 * @RETURN returns data object from imdb
 */
router.get("/search/:title", async (req, res) => {
  let title = req.params.title.replace("_", " "); //
  let request_options = Object.assign({}, options);
  request_options.params.q = title;

  try {
    let results = await axios.request(request_options);

    res.send(results.data); //sent results from imdb as the response
  } catch (error) {
    console.error(error?.data);
    res.status(500).send("failed to fetch data");
  }
});

/**
 * @description add a favorite entry into the db for the the user
 * @return copy of favorite
 */
router.get("/favorite/:user_id/:movie_id", async (req, res) => {
  try {
    //insert a user movie pair into the database if it does not exists already
    const fav = await UserFav.create({
      user_id: req.params.user_id,
      movie_id: req.params.movie_id,
    });
    console.log(fav.toJSON());
    res.json(fav);
    //return count of updated element
  } catch (error) {
    console.error(error);
    res.status(500).send("failed to favorite");
  }
});

/**
 * @description add a rating entry into the db with an associated user and movie
 * @return copy of created rating
 */
router.get("/rating/:movie_id/:user_id/:rating", async (req, res) => {
  try {
    const rating = await Rating.create({
      movie_id: req.params.movie_id,
      user_id: req.params.user_id,
      rating: req.params.rating,
    });
    res.json(rating);
  } catch (error) {
    console.error(error?.data); //can use ? as a conditional?!!
    res.status(500).send("failed to fect data");
  }
});

/**
 * @description get a movies based on an imdb
 * @return response object from imdb
 */
router.get("/find/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let request_options = Object.assign({}, options_details);
    request_options.params.tconst = id;
    let results = await axios.request(request_options);

    res.send(results.data); //sent results from imdb movie details as the response
  } catch (error) {
    console.error(error?.data);
    res.status(500).send("failed to fect data");
  }
});

//get all movies
router.get("/", (req, res) => {
  Movie.findAll({
    attributes: ["id", "title", "rating", "viewed", "genre_id"],
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

module.exports = router;

// router.get('/:title', (req, res) => {
//     // find a single movie product by its `title`

//     Movie.findOne({
//         where: {
//             title: req.params.title
//         },
//         include: [
//             {
//                 model: Genre,
//                 attributes: ["id", "genre_name"]
//             },

//         ]
//     })
//         .then((dbMovieData) => {
//             if (!dbMovieData) {
//                 res.status(404).json({ message: "We can't find a movie called this. 🙁" });
//                 return;
//             }
//             res.json(dbMovieData);
//         })
//         .catch(err => {
//             console.log(err);
//             res.status(500).json(err);
//         });
// });

/// do we want to 'create' movies or should we 'create' the post which will contain the movie?

//   axios.request(options).then(function (response) {
//       console.log("++++++++++++++++++++++++++++++", response.data.results[0]);
//   }).catch(function (error) {
//       console.error(error);
//       router.get('/title', (req,res) => {
//           res.send(res.data)
//       })
//   });

//  router.post('/title', (req, res) => {
//     console.log("_____________________________________");
//       const item = req.body.inputId;

//       res.send("got it");
//   });
