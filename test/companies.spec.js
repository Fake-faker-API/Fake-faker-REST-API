const should = require("should");
const request = require("request");
const chai = require("chai");
const expect = chai.expect;
const urlBase = "https://fakefakerapi.herokuapp.com";
const getRandomNumber = require("../utils/generateRandomNumber");

describe("/companies endpoint", function () {
  this.timeout(3000);
  let body = {};
  it("Should return 100 companies", function (done) {
    setTimeout(() => request.get(
      {
        url: urlBase + "/companies"
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

  it("Company object should be of correct type and have a set of predefined properties", function (done) {
    setTimeout(() => request.get(
      {
        url: urlBase + "/companies"
      },
      function (error, response, body) {

        body = {};
        try {
          body = JSON.parse(response.body);
        }
        catch (error) {
          body = {};
        }
        const company = body[0];
        expect(response.statusCode).to.equal(200);
        expect(company).to.be.an('object');
        expect(company.should.have.property('id'));
        expect(company.should.have.property('name'));
        expect(company.should.have.property('phone'));
        expect(company.should.have.property('country'));
        expect(company.should.have.property('state'));
        expect(company.should.have.property('city'));
        expect(company.should.have.property('address'));
        expect(company.should.have.property('zipcode'));
        expect(company.should.have.property('website'));
        done();
      }
    ), 2000);
  });

  it("Company should not have properties: first_name, last_name", (done) => {
    setTimeout(() => request.get(
      {
        url: urlBase + "/companies"
      },
      function (error, response, body) {

        body = {};
        try {
          body = JSON.parse(response.body);
        }
        catch (error) {
          body = {};
        }

        const company = body[0];
        expect(response.statusCode).to.equal(200);
        expect(company.should.not.have.property('first_name'));
        expect(company.should.not.have.property('last_name'));
        done();
      }
    ), 1000);
  });

  it("Company property values should be of correct type", (done) => {
    const companyIndex = getRandomNumber(1, 100);

    setTimeout(() => request.get(
      {
        url: urlBase + "/companies"
      },
      function (error, response, body) {

        body = {};
        try {
          body = JSON.parse(response.body);
        }
        catch (error) {
          body = {};
        }

        const company = body[companyIndex];
        expect(response.statusCode).to.equal(200);
        expect(company.id).to.be.a('number');
        expect(company.name).to.be.a('string');
        expect(parseInt(company.phone)).to.be.a('number');
        expect(company.country).to.be.a('string');
        expect(company.state).to.be.a('string');
        expect(company.city).to.be.a('string');
        expect(company.address).to.be.a('string');
        expect(parseInt(company.zipcode)).to.be.a('number');
        expect(company.website).to.be.a('string');
        done();
      }
    ), 1000);
  });

  it("Company property values should have minimum length", (done) => {
    const companyIndex = getRandomNumber(1, 100);

    setTimeout(() => request.get(
      {
        url: urlBase + "/companies"
      },
      function (error, response, body) {

        body = {};
        try {
          body = JSON.parse(response.body);
        }
        catch (error) {
          body = {};
        }

        const company = body[companyIndex];
        expect(response.statusCode).to.equal(200);
        expect(company.name).to.have.lengthOf.above(1);
        expect(company.phone).to.have.lengthOf.above(1);
        expect(company.country).to.have.lengthOf.above(1);
        expect(company.state).to.have.lengthOf.above(1);
        expect(company.city).to.have.lengthOf.above(1);
        expect(company.address).to.have.lengthOf.above(1);
        expect(company.zipcode).to.have.lengthOf.above(1);
        expect(company.website).to.have.lengthOf.above(1);
        done();
      }
    ), 1000);
  });
});