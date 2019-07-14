const jwt = require('jsonwebtoken');
import dotenv from 'dotenv';



dotenv.config();
const SECRET = process.env.JWT_KEY;


module.exports = (req, res, next) => {
  const token = req.headers.token;
  if (typeof token === 'undefined') return res.status(401)
    .json({
      status:401,
      message:'Access denied. No token provided.'
    });
  jwt.verify(token, process.env.JWT_KEY, (err, decodedToken) => {
    if (err) res.status(401).send('Invalid token.');
    req.user = decodedToken;
    next();
  });
};
