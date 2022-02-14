const should = require("should");
const request = require("request");
const chai = require("chai");
const expect = chai.expect;
const urlBase = "https://fakefakerapi.herokuapp.com";

describe("/books endpoint", function () {
  this.timeout(3000);
  let body = {};
  it("Should return 100 books", function (done) {
    setTimeout(() => request.get(
      {
        url: urlBase + "/books"
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

   it("Book should have a set of properties", function (done) {
     setTimeout(() => request.get(
       {
         url : urlBase + "/books" 
       },
       function(error, response, body){

         body = {};
         try {
           body = JSON.parse(response.body);
         }
         catch(error){
           body = {};
         }
         const book = body[0];
         expect(response.statusCode).to.equal(200);
         expect(book.should.have.property('id'));
         expect(book.should.have.property('title'));
         expect(book.should.have.property('author'));
         expect(book.should.have.property('genre'));
         expect(book.should.have.property('description'));
         expect(book.should.have.property('isbn'));
         expect(book.should.have.property('date_published'));
         expect(book.should.have.property('publisher'));
         done();
       }
     ), 2000);
   });
});