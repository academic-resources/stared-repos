const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET || "secret secret, i got a secret";

module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  if (req.decodedJwt) {
    next();
  } else if (token) {
    jwt.verify(token, secret, (err, decodedJwt) => {
      // if the token doesn't verify
      if (err) {
        res.status(401).json({
          message:
            "Invalid Credentials. You must be logged in to view this page"
        });
        // if it DOES...
      } else {
        req.decodedJwt = decodedJwt;
        next();
      }
    });
  } else {
    res.status(400).json({
      message:
        "No credentials provided. You must be logged in to view this page."
    });
  }
};
