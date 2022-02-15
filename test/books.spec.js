const should = require("should");
const request = require("request");
const chai = require("chai");
const expect = chai.expect;
const urlBase = "https://fakefakerapi.herokuapp.com";
const getRandomNumber = require("../utils/generateRandomNumber");


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

  it("Book object should be of correct type and have a set of predefined properties", function (done) {
    setTimeout(() => request.get(
      {
        url: urlBase + "/books"
      },
      function (error, response, body) {

        body = {};
        try {
          body = JSON.parse(response.body);
        }
        catch (error) {
          body = {};
        }
        const book = body[0];
        expect(response.statusCode).to.equal(200);
        expect(book).to.be.an('object');
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

  it("Book should not have properties: street_name, city", (done) => {
    setTimeout(() => request.get(
      {
        url: urlBase + "/books"
      },
      function (error, response, body) {

        body = {};
        try {
          body = JSON.parse(response.body);
        }
        catch (error) {
          body = {};
        }

        const book = body[0];
        expect(response.statusCode).to.equal(200);
        expect(book.should.not.have.property('street_name'));
        expect(book.should.not.have.property('city'));
        done();
      }
    ), 1000);
  });

  it("Book property values should be of correct type", (done) => {
    const bookIndex = getRandomNumber(1, 100);

    setTimeout(() => request.get(
      {
        url: urlBase + "/books"
      },
      function (error, response, body) {

        body = {};
        try {
          body = JSON.parse(response.body);
        }
        catch (error) {
          body = {};
        }

        const book = body[bookIndex];
        expect(response.statusCode).to.equal(200);
        expect(book.id).to.be.a('number');
        expect(book.title).to.be.a('string');
        expect(book.author).to.be.a('string');
        expect(book.genre).to.be.a('string');
        expect(book.description).to.be.a('string');
        expect(book.isbn).to.be.a('string');
        expect(new Date(book.date_published)).to.be.a('date');
        expect(book.publisher).to.be.a('string');
        done();
      }
    ), 1000);
  });

  it("Book property values should have minimum length", (done) => {
    const bookIndex = getRandomNumber(1, 100);

    setTimeout(() => request.get(
      {
        url: urlBase + "/books"
      },
      function (error, response, body) {

        body = {};
        try {
          body = JSON.parse(response.body);
        }
        catch (error) {
          body = {};
        }

        const book = body[bookIndex];
        expect(response.statusCode).to.equal(200);
        expect(book.title).to.have.lengthOf.above(1);
        expect(book.author).to.have.lengthOf.above(1);
        expect(book.genre).to.have.lengthOf.above(1);
        expect(book.description).to.have.lengthOf.above(1);
        expect(book.isbn).to.have.lengthOf.above(1);
        expect(book.publisher).to.have.lengthOf.above(1);
        done();
      }
    ), 1000);
  });
});