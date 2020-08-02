const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.header("auth-token");
  if (!token)
    return res.status(401).send({ status: "error", data: { error: "Access Denied" } });

  try {
    const payload = jwt.verify(token, process.env.TOKEN_SECRET);
    req.auth = payload;
    next();
  } catch (error) {
    res.status(400).send({ status: "error", data: { error: "Invalid token." } });
  }
};
