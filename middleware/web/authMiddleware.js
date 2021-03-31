const JWTHelper = require('../../utils/JWTHelper');

const JWTConfig = require("../../configs/web/JWTConfig");

module.exports = (req, res, next) => {
  if (!req.headers['user-authorization']) {
    return res.status(200).json({
      res: -1,
      msg: '未登入',
    });
  }

  try {
    let user = JWTHelper.verify(req.headers['user-authorization'], JWTConfig.key);
    req.headers.user = user;
  } catch (err) {
    return res.status(400).json({
      res: -1,
      msg: '伺服器發生資料解密的非預期錯誤，請聯絡開發人員',
    });
  }

  next();
};
