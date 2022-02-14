const should = require("should");
const request = require("request");
const chai = require("chai");
const expect = chai.expect;
const urlBase = "https://fakefakerapi.herokuapp.com";

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
         url : urlBase + "/movies" 
       },
       function(error, response, body){

         body = {};
         try {
           body = JSON.parse(response.body);
         }
         catch(error){
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
});