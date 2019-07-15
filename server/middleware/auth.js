import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';



dotenv.config();
const SECRET = process.env.JWT_KEY;


module.exports = (req, res, next) => {
  const token = req.headers.token || req.headers.authorization;
  if (typeof token === 'undefined') return res.status(401)
    .json({
      status:401,
      message:'Access denied. No token provided.'
    });
  jwt.verify(token, SECRET, (err, decodedToken) => {
    if (err) res.status(401).send('Invalid token.');
    req.user = decodedToken;
    next();
  });
};
