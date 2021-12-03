var express = require("express");
var router = express.Router();
const fs = require("fs");
const path = require("path");
const catchError = require("../lib/catch-error");
const {
    getCompanies
} = require("../lib/companies-query");

/**
 * @api {get} /companies Retrieves all companies
 * @apiGroup companies
 * 
 * @apiSuccess {Object[]} company                    List of companies.
 * @apiSuccess {Number}   company.id                 Id of the company.
 * @apiSuccess {String}   company.name               Name of the company.
 * @apiSuccess {String}   company.phone              Phone of the company.
 * @apiSuccess {String}   company.country            Country where company is located.
 * @apiSuccess {String}   company.state              State where company is located.
 * @apiSuccess {String}   company.city               City where company is located.
 * @apiSuccess {String}   company.address            Company address.
 * @apiSuccess {String}   company.zipcode            Company zipcode.
 * @apiSuccess {String}   company.website            Company website.
 * 
 * 
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 * 
    [
    {
        "id": 1,
        "name": "ABC corp",
        "phone": "+17819004517",
        "country": "US",
        "state": "IL",
        "city": "Chicago",
        "address": "904 W Monroe street, St 1004",
        "zipcode": "60604",
        "website": "www.company-site.io"
    },
    {
        "id": 2,
        "name": "ABC corp",
        "phone": "+17819004517",
        "country": "US",
        "state": "IL",
        "city": "Chicago",
        "address": "904 W Monroe street, St 1004",
        "zipcode": "60604",
        "website": "www.company-site.io"
    }
    ]
 */

router.get(
    "/",
    catchError(async (req, res, next) => {
        let result = await getCompanies();
        res.json(result.rows);
    })
);

module.exports = router;