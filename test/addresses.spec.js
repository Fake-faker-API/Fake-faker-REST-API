const should = require("should");
const request = require("request");
const chai = require("chai");
const expect = chai.expect;
const urlBase = "https://fakefakerapi.herokuapp.com";

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

   it("Address should have a set of properties", (done) => {
     setTimeout(() => request.get(
       {
         url : urlBase + "/addresses" 
       },
       function(error, response, body){

         body = {};
         try {
           body = JSON.parse(response.body);
         }
         catch(error){
           body = {};
         }

         const address = body[0];
         expect(response.statusCode).to.equal(200);
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
});