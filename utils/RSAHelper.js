const NodeRSA = require('node-rsa');

exports.RSADecrypt = function RSADecrypt(str, privateKey) {
  let nodeRSA = new NodeRSA(privateKey, 'private');
  nodeRSA.setOptions({ encryptionScheme: 'pkcs1' });
  return nodeRSA.decrypt(str, 'utf8');
};

exports.RSAEncrypt = function RSAEncrypt(str, publicKey) {
  let nodeRSA = new NodeRSA(publicKey, 'public');
  nodeRSA.setOptions({ encryptionScheme: 'pkcs1' });
  return nodeRSA.encrypt(str, 'base64');
};
