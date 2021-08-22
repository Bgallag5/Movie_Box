### Notes on what to accomplish

Descriptions:
this is going to be a fun website where a user can search for some movies based on a search and we return results from imbd

the user can also click the title and that title is a link to amazon/imdb so they can get more info about the movie
the user can also see the poster url  
the user can 'favorite' or rate a movie -- crud

movies
routes
-- searche
-- favourites

end points
/\*\*

- @DESCRIPTION route to search for a movies given a title : NOTE, REPLACE WHITE SPACES WITH UNDERSCORE
- @RETURN returns data object from imdb
  \*/
  /api/movies/search/:title"

/\*\*

- @description add a favorite entry into the db for the the user
- @return copy of favorite
  \*/
  /api/movies/favorite/:user_id/:movie_id

/\*\*

- @description add a rating entry into the db with an associated user and movie
- @return copy of created rating
  \*/
  /api/movies/rating/:movie_id/:user_id/:rating

/\*\*

- @description get a movies based on an imdb
- @return response object from imdb
  \*/
  /api/movies/find/:id
