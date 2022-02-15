const should = require("should");
const request = require("request");
const chai = require("chai");
const expect = chai.expect;
const urlBase = "https://fakefakerapi.herokuapp.com";
const getRandomNumber = require("../utils/generateRandomNumber");

describe("/addresses endpoint", function () {
  this.timeout(4000);
  let body = {};
  it("Should return 100 addresses", function (done) {
    setTimeout(() => {
      request.get(
        {
          url: urlBase + "/addresses"
        },
        (error, response, _) => {
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
      );

    }, 1000)
  });

  it("Address object should be of correct type and have a set of predefined properties", (done) => {
    const addressIndex = getRandomNumber(0, 100);
    setTimeout(() => request.get(
      {
        url: urlBase + "/addresses"
      },
      function (error, response, body) {

        body = {};
        try {
          body = JSON.parse(response.body);
        }
        catch (error) {
          body = {};
        }

        const address = body[addressIndex];
        expect(response.statusCode).to.equal(200);
        expect(address).to.be.an('object');
        expect(address.should.have.property('id'));
        expect(address.should.have.property('street_number'));
        expect(address.should.have.property('city'));
        expect(address.should.have.property('state'));
        expect(address.should.have.property('zipcode'));
        expect(address.should.have.property('country'));
        done();
      }
    ), 1000);
  });

  it("Address should not have properties: last_name, first_name", (done) => {
    setTimeout(() => request.get(
      {
        url: urlBase + "/addresses"
      },
      function (error, response, body) {

        body = {};
        try {
          body = JSON.parse(response.body);
        }
        catch (error) {
          body = {};
        }

        const address = body[0];
        expect(response.statusCode).to.equal(200);
        expect(address.should.not.have.property('first_name'));
        expect(address.should.not.have.property('last_name'));
        done();
      }
    ), 1000);
  });

  it("Address property values should be of correct type", (done) => {
    const addressIndex = getRandomNumber(1, 100);

    setTimeout(() => request.get(
      {
        url: urlBase + "/addresses"
      },
      function (error, response, body) {

        body = {};
        try {
          body = JSON.parse(response.body);
        }
        catch (error) {
          body = {};
        }

        const address = body[addressIndex];
        expect(response.statusCode).to.equal(200);
        expect(address.id).to.be.a('number');
        expect(address.street_number).to.be.a('string');
        expect(address.city).to.be.a('string');
        expect(address.state).to.be.a('string');
        expect(parseInt(address.zipcode)).to.be.a('number');
        expect(address.country).to.be.a('string');
        done();
      }
    ), 1000);
  });

  it("Address property values should have minimum length", (done) => {
    const addressIndex = getRandomNumber(1, 100);

    setTimeout(() => request.get(
      {
        url: urlBase + "/addresses"
      },
      function (error, response, body) {

        body = {};
        try {
          body = JSON.parse(response.body);
        }
        catch (error) {
          body = {};
        }

        const address = body[addressIndex];
        expect(response.statusCode).to.equal(200);
        expect(address.street_number).to.have.lengthOf.above(1);
        expect(address.city).to.have.lengthOf.above(1);
        expect(address.state).to.have.lengthOf.above(1);
        expect(address.zipcode).to.have.lengthOf.above(1);
        expect(address.country).to.have.lengthOf.above(1);
        done();
      }
    ), 1000);
  });
});


