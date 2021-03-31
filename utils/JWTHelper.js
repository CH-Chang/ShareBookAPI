const jwt = require("jsonwebtoken");

exports.sign = (data, expiresIn, key) => {
    return jwt.sign(data, key, { expiresIn: expiresIn });
  };
  
  exports.verify = (token, key) => {
    return jwt.verify(token, key);
  };