const jwt = require('jsonwebtoken');
import dotenv from 'dotenv';



dotenv.config();
const SECRET = process.env.JWT_KEY;


module.exports = function (req, res, next) {
  const token = req.header('x-auth-token');
  if (!token) return res.status(401)
    .json({
      status:400,
      message:'Access denied. No token provided.'
    });

  try {
    const decoded = jwt.verify(token, SECRET );  
    req.user = decoded; 
    next();
  }
  catch (ex) {
    res.status(400).send('Invalid token.');
  }
};

