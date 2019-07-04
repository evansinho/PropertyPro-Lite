import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const SECRET = process.env.JWT_KEY;


const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (typeof authHeader === 'undefined') {
    return res.status(401)
    .json({
      status:401,
      message: 'Unauthorised - Header Not Set'
    })
  }
  const token = authHeader.split(' ')[1];
  jwt.verify(token, SECRET, (err, decodedToken) => {
    if (err) {
       return res.status(401).json({
        status: 401,
        message: 'invalid token'
       });
    }
    req.user = decodedToken;
    next();
  });
};


const adminOnly = (req, res, next) => {
  const { is_admin } = req.user;
  if (is_admin === false) {
    return res.status(403).json({
        status: 403,
        message: 'Unauthorized Access. For admins accounts only'
       });
  }
  next();
};


module.exports = { verifyToken, adminOnly };