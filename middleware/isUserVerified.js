const AppError = require("../appError/appError");

const isUserVerified = (req, res, next) => {
  if (req.user.email_verified) {
    //  if (req.user.email_verified && req.user.mobile_verified)

    next();
  } else {
    next(new AppError("USER IS NOT VERIFIED", 401));
  }
};

module.exports = isUserVerified;
