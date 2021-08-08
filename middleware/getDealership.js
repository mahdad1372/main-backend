const AppError = require("../appError/appError");

const getDealership = async (req, res, next) => {
  try {
    const dealershipInfo = await req.user.getDealership();
    req.dealership = dealershipInfo;

    next();
  } catch (err) {
    next(new AppError("DEALERSHIP ID ISSUE", 400));
  }
};

module.exports = getDealership;
