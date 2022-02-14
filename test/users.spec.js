const should = require("should");
const request = require("request");
const chai = require("chai");
const expect = chai.expect;
const urlBase = "https://fakefakerapi.herokuapp.com";

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
         url : urlBase + "/users" 
       },
       function(error, response, body){

         body = {};
         try {
           body = JSON.parse(response.body);
         }
         catch(error){
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
});