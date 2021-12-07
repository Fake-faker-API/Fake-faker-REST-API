const config = require("../lib/config");

const options = {
  applicationId: config.MOESIF_APPLICATION_ID,

  logBody: true,

  identifyUser: function (req, res) {
    if (req.user) {
      return req.user.id;
    }
    return undefined;
  },

  getSessionToken: function (req, res) {
    return req.headers['Authorization'];
  }
};

module.exports = {
  options
}