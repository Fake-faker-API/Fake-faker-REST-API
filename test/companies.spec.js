const should = require("should");
const request = require("request");
const chai = require("chai");
const expect = chai.expect;
const urlBase = "https://fakefakerapi.herokuapp.com";

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

   it("Company should have a set of properties", function (done) {
     setTimeout(() => request.get(
       {
         url : urlBase + "/companies" 
       },
       function(error, response, body){

         body = {};
         try {
           body = JSON.parse(response.body);
         }
         catch(error){
           body = {};
         }
         const company = body[0];
         expect(response.statusCode).to.equal(200);
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
});