const crypto = require('crypto');

exports.HMACSHA256Hash = function (str, key) {
  let sha256 = crypto.createHmac('sha256', key);
  return sha256.update(str).digest('base64');
};
