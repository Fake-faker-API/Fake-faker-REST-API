const should = require("should");
const request = require("request");
const chai = require("chai");
const expect = chai.expect;
const urlBase = "https://fakefakerapi.herokuapp.com";
const getRandomNumber = require("../utils/generateRandomNumber");

describe("/users endpoint", function () {
  this.timeout(3000);
  let body = {};
  it("Should return 100 users", function (done) {
    setTimeout(() => request.get(
      {
        url: urlBase + "/users"
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

  it("User should have a set of properties", function (done) {
    setTimeout(() => request.get(
      {
        url: urlBase + "/users"
      },
      function (error, response, body) {

        body = {};
        try {
          body = JSON.parse(response.body);
        }
        catch (error) {
          body = {};
        }
        const user = body[0];
        expect(response.statusCode).to.equal(200);
        expect(user.should.have.property('id'));
        expect(user.should.have.property('first_name'));
        expect(user.should.have.property('last_name'));
        expect(user.should.have.property('username'));
        expect(user.should.have.property('password'));
        expect(user.should.have.property('email'));
        done();
      }
    ), 2000);
  });

  it("User should not have properties: street_name, city", (done) => {
    setTimeout(() => request.get(
      {
        url: urlBase + "/users"
      },
      function (error, response, body) {

        body = {};
        try {
          body = JSON.parse(response.body);
        }
        catch (error) {
          body = {};
        }

        const user = body[0];
        expect(response.statusCode).to.equal(200);
        expect(user.should.not.have.property('street_name'));
        expect(user.should.not.have.property('city'));
        done();
      }
    ), 1000);
  });

  it("User property values should be of correct type", (done) => {
    const userIndex = getRandomNumber(1, 100);

    setTimeout(() => request.get(
      {
        url: urlBase + "/users"
      },
      function (error, response, body) {

        body = {};
        try {
          body = JSON.parse(response.body);
        }
        catch (error) {
          body = {};
        }

        const user = body[userIndex];
        expect(response.statusCode).to.equal(200);
        expect(user.id).to.be.a('number');
        expect(user.first_name).to.be.a('string');
        expect(user.last_name).to.be.a('string');
        expect(user.username).to.be.a('string');
        expect(user.password).to.be.a('string');
        expect(user.email).to.be.a('string');
        done();
      }
    ), 1000);
  });

  it("User property values should have minimum length", (done) => {
    const userIndex = getRandomNumber(1, 100);

    setTimeout(() => request.get(
      {
        url: urlBase + "/users"
      },
      function (error, response, body) {

        body = {};
        try {
          body = JSON.parse(response.body);
        }
        catch (error) {
          body = {};
        }

        const user = body[userIndex];
        expect(response.statusCode).to.equal(200);
        expect(user.last_name).to.have.lengthOf.above(1);
        expect(user.first_name).to.have.lengthOf.above(1);
        expect(user.username).to.have.lengthOf.above(1);
        expect(user.password).to.have.lengthOf.above(1);
        expect(user.email).to.have.lengthOf.above(1);
        done();
      }
    ), 1000);
  });
});