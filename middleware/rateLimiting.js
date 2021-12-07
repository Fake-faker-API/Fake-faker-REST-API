const requestIP = require('request-ip');
const isIp = require('is-ip');

const {
  TIME_FRAME_IN_S,
  TIME_FRAME_IN_MS,
  MS_TO_S,
  RPS_LIMIT
} = require('../utils/constants/rate-limiting-const');


const ipMiddleware = (IPCache) => {
  return async function (req, res, next) {

  
  IPCache.on('expired', (key, value) => {
  if (new Date() - value[value.length - 1] > TIME_FRAME_IN_MS) {
      IPCache.del(key);
  } else {
    const updatedValue = value.filter(function (element) {
        return new Date() - element < TIME_FRAME_IN_MS;
    });
    IPCache.set(key, updatedValue, TIME_FRAME_IN_S - (new Date() - updatedValue[0]) * MS_TO_S);
  }
});

const updateCache = (ip) => {
  let IPArray = IPCache.get(ip) || [];
  IPArray.push(new Date());
  IPCache.set(ip, IPArray, (IPCache.getTtl(ip) - Date.now()) * MS_TO_S || TIME_FRAME_IN_S);
};

  let clientIP = requestIP.getClientIp(req);
  if (isIp.v6(clientIP)) {
      clientIP = clientIP.split(':').splice(0, 4).join(':') + '::/64';
  }

  updateCache(clientIP);
  console.log('=>', clientIP);
  const IPArray = IPCache.get(clientIP);
  console.log('IP array ', IPArray);
  if (IPArray.length > 1) {
      const rps = IPArray.length / ((IPArray[IPArray.length - 1] - IPArray[0]) * MS_TO_S);
      if (rps > RPS_LIMIT) {
          console.log('You are hitting limit', clientIP);
          res.status(429).send('Too many requests');
          return;
      }
  }
  next();
}
};

module.exports = {
  ipMiddleware
}