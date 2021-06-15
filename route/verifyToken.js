const jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) return res.send("Token not present");

  try {
    const verified = jwt.verify(token, "dsfsdfsdfsdgfghh");
    req.user = verified;
    next();
  } catch (err) {
    res.send("Invalid Token");
  }
};
