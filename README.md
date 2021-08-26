### Notes on what to accomplish

Description:
Users can view our movie Database on the home page. They can then choose to sign up or login to search for additional movies. Once a user searches, our movie API returns results based on title. The user sees all matches from that title in the form of the movie poster image, the title, and year. From here, the user can click on a movie for additional details. On this page, they can also write their own review/notes about the movie. The user can also "favorite" movies that they like and view them on a separate page.

movies
routes
-- search
-- favs

end points

- @DESCRIPTION route to search for a movies given a title : NOTE, REPLACE white space from imdb with underscore
- @RETURN returns data object from imdb

  /api/movies/search/:title"

- @description add a favorite entry into the db for the the user
- @return copy of favorite

  /api/movies/favorite/:user_id/:movie_id

- @description add a rating entry into the db with an associated user and movie
- @return copy of created rating

  /api/movies/rating/:movie_id/:user_id/:rating

- @description get a movies based on an imdb
- @return response object from imdb

  /api/movies/find/:id

## route to add review to movie (post route)

http://localhost:3001/api/reviews/createNew
