const should = require("should");
const request = require("request");
const chai = require("chai");
const expect = chai.expect;
const urlBase = "https://fakefakerapi.herokuapp.com";

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

   it("Products should have a set of properties", function (done) {
     setTimeout(() => request.get(
       {
         url : urlBase + "/products" 
       },
       function(error, response, body){

         body = {};
         try {
           body = JSON.parse(response.body);
         }
         catch(error){
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
});