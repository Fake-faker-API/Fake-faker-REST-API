var express = require("express");
var router = express.Router();
const fs = require("fs");
const path = require("path");
const {
  dbQuery
} = require("../lib/db-query");
const catchError = require("../lib/catch-error");
const {
  getMovies
} = require("../lib/movies-query");

/**
 * @api {get} /movies Retrieves all movies
 * @apiGroup movies
 * 
 * @apiSuccess {Object[]} movie                        List of movies.
 * @apiSuccess {Number}   movie.id                     Id of the movie.
 * @apiSuccess {String}   movie.title                  Title of the movie.
 * @apiSuccess {String}   movie.genre                  Genre(s) of the movie.
 * @apiSuccess {String}   movie.director               Movie director(s).
 * @apiSuccess {String}   movie.description            Description of the movie.
 * @apiSuccess {String}   movie.movie_length_minutes   Length of the movie, in minutes.
 * @apiSuccess {Date}     movie.date_released          Date of movie release.
 * @apiSuccess {String}   movie.top_cast               Top cast starring in the movie.
 * 
 * 
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 * 
    [
      {
        "id": 1,
        "title": "Da Matrix",
        "genre": "Science Fiction, Action",
        "director": "Donna Summers",
        "description": "Intriguing adventure into the unknown",
        "movie_length_minutes": 183,
        "date_released": "1991-01-01T06:00:00.000Z",
        "top_cast": "Bruce Springsteen"
      }
    ]
 */

router.get(
  "/",
  catchError(async (req, res, next) => {
    let result = await getMovies();
    res.json(result.rows);
  })
);

module.exports = router;