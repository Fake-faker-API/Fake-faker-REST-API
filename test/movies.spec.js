const should = require("should");
const request = require("request");
const chai = require("chai");
const expect = chai.expect;
const urlBase = "https://fakefakerapi.herokuapp.com";
const getRandomNumber = require("../utils/generateRandomNumber");


describe("/movies endpoint", function () {
  this.timeout(3000);
  let body = {};
  it("Should return 100 movies", function (done) {
    setTimeout(() => request.get(
      {
        url: urlBase + "/movies"
      },
      function (error, response, _) {
        try {
          body = JSON.parse(response.body);
        }
        catch (error) {
          console.log(`there was an error ${error}`);
        }

        expect(response.statusCode).to.equal(200);
        expect(body.length).to.equal(100);

        done();
      }
    ), 1000);
  });

  it("Movies should have a set of properties", function (done) {
    setTimeout(() => request.get(
      {
        url: urlBase + "/movies"
      },
      function (error, response, body) {

        body = {};
        try {
          body = JSON.parse(response.body);
        }
        catch (error) {
          body = {};
        }
        const movie = body[0];
        expect(response.statusCode).to.equal(200);
        expect(movie.should.have.property('id'));
        expect(movie.should.have.property('title'));
        expect(movie.should.have.property('genre'));
        expect(movie.should.have.property('director'));
        expect(movie.should.have.property('description'));
        expect(movie.should.have.property('movie_length_minutes'));
        expect(movie.should.have.property('date_released'));
        expect(movie.should.have.property('top_cast'));
        done();
      }
    ), 2000);
  });

  it("Movie should not have properties: street_name, city", (done) => {
    setTimeout(() => request.get(
      {
        url: urlBase + "/movies"
      },
      function (error, response, body) {

        body = {};
        try {
          body = JSON.parse(response.body);
        }
        catch (error) {
          body = {};
        }

        const movie = body[0];
        expect(response.statusCode).to.equal(200);
        expect(movie.should.not.have.property('street_name'));
        expect(movie.should.not.have.property('city'));
        done();
      }
    ), 1000);
  });

  it("Movie property values should be of correct type", (done) => {
    const movieIndex = getRandomNumber(1, 100);

    setTimeout(() => request.get(
      {
        url: urlBase + "/movies"
      },
      function (error, response, body) {

        body = {};
        try {
          body = JSON.parse(response.body);
        }
        catch (error) {
          body = {};
        }

        const movie = body[movieIndex];
        expect(response.statusCode).to.equal(200);
        expect(movie.id).to.be.a('number');
        expect(movie.title).to.be.a('string');
        expect(movie.genre).to.be.a('string');
        expect(movie.director).to.be.a('string');
        expect(movie.description).to.be.a('string');
        expect(movie.movie_length_minutes).to.be.a('number');
        expect(new Date(movie.date_released)).to.be.a('date');
        expect(movie.top_cast).to.be.a('string');
        done();
      }
    ), 1000);
  });

  it("movie property values should have minimum length/value", (done) => {
    const movieIndex = getRandomNumber(1, 100);

    setTimeout(() => request.get(
      {
        url: urlBase + "/movies"
      },
      function (error, response, body) {

        body = {};
        try {
          body = JSON.parse(response.body);
        }
        catch (error) {
          body = {};
        }

        const movie = body[movieIndex];
        expect(response.statusCode).to.equal(200);
        expect(movie.title).to.have.lengthOf.above(1);
        expect(movie.genre).to.have.lengthOf.above(1);
        expect(movie.director).to.have.lengthOf.above(1);
        expect(movie.movie_length_minutes).to.be.above(1);
        expect(movie.top_cast).to.have.lengthOf.above(1);
        done();
      }
    ), 1000);
  });
});