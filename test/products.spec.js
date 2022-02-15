const should = require("should");
const request = require("request");
const chai = require("chai");
const expect = chai.expect;
const urlBase = "https://fakefakerapi.herokuapp.com";
const getRandomNumber = require("../utils/generateRandomNumber");

describe("/products endpoint", function () {
  this.timeout(3000);
  let body = {};
  it("Should return 100 products", function (done) {
    setTimeout(() => request.get(
      {
        url: urlBase + "/products"
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

  it("Product should have a set of properties", function (done) {
    setTimeout(() => request.get(
      {
        url: urlBase + "/products"
      },
      function (error, response, body) {

        body = {};
        try {
          body = JSON.parse(response.body);
        }
        catch (error) {
          body = {};
        }
        const product = body[0];
        expect(response.statusCode).to.equal(200);
        expect(product.should.have.property('id'));
        expect(product.should.have.property('title'));
        expect(product.should.have.property('description'));
        expect(product.should.have.property('price'));
        expect(product.should.have.property('category'));
        expect(product.should.have.property('sku'));
        expect(product.should.have.property('stock_quantity'));
        done();
      }
    ), 2000);
  });
  it("Product should not have properties: street_name, city", (done) => {
    setTimeout(() => request.get(
      {
        url: urlBase + "/products"
      },
      function (error, response, body) {

        body = {};
        try {
          body = JSON.parse(response.body);
        }
        catch (error) {
          body = {};
        }

        const product = body[0];
        expect(response.statusCode).to.equal(200);
        expect(product.should.not.have.property('street_name'));
        expect(product.should.not.have.property('city'));
        done();
      }
    ), 1000);
  });

  it("Product property values should be of correct type", (done) => {
    const productIndex = getRandomNumber(1, 100);

    setTimeout(() => request.get(
      {
        url: urlBase + "/products"
      },
      function (error, response, body) {

        body = {};
        try {
          body = JSON.parse(response.body);
        }
        catch (error) {
          body = {};
        }

        const product = body[productIndex];
        expect(response.statusCode).to.equal(200);
        expect(product.id).to.be.a('number');
        expect(product.title).to.be.a('string');
        expect(product.description).to.be.a('string');
        expect(product.price).to.be.a('string');
        expect(product.category).to.be.a('string');
        expect(product.sku).to.be.a('string');
        expect(product.stock_quantity).to.be.a('number');
        done();
      }
    ), 1000);
  });

  it("Product property values should have minimum length/value", (done) => {
    const productIndex = getRandomNumber(1, 100);

    setTimeout(() => request.get(
      {
        url: urlBase + "/products"
      },
      function (error, response, body) {

        body = {};
        try {
          body = JSON.parse(response.body);
        }
        catch (error) {
          body = {};
        }

        const product = body[productIndex];
        expect(response.statusCode).to.equal(200);
        expect(product.title).to.have.lengthOf.above(1);
        expect(product.description).to.have.lengthOf.above(1);
        expect(product.price).to.have.lengthOf.above(1);
        expect(product.category).to.have.lengthOf.above(1);
        expect(product.sku).to.have.lengthOf.above(1);
        expect(product.stock_quantity).to.be.above(0);
        done();
      }
    ), 1000);
  });
});