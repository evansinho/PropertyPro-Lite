module.exports = function (req, res, next) { 

  if (!req.user.is_admin) return res.status(403)
  	.json({
  		status:403,
  		message:'Access denied.'
  	});

  next();
};