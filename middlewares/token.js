const { user } = require("../models/index");

exports.authorization = async (req, res, next) => {
  if (req.headers.authorization) {
    const auth = await user.findOne({
      where: { token: req.headers.authorization }
    });

    if (auth) {
      req.auth = auth;
      next();
    } else {
      res.status(403).json({
        status: false,
        message: "Token not valid"
      });
    }
    try {
    } catch (error) {
      res.status(500).json({
        status: false,
        message: error
      });
    }
  } else {
    res.status(401).json({
      status: false,
      message: "Who are you?"
    });
  }
};
