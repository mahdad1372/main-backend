const User = require("../model/user");
const jwt = require("jsonwebtoken");
const AppError = require("../appError/appError");

const userAuth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    jwt.verify(token, "salar", async (err, decode) => {
      if (err) {
        return next(new AppError("Unauthorized", 401));
      }
      try {
        const user = await User.findOne({
          where: { id: decode.id, active: 1 },
        });
        if (!user) {
          return next(new AppError("User Not Found", 404));
        }
        req.user = user;
        next();
      } catch (err) {
        return next(new AppError("BAD REQUEST", 400));
      }
    });
  } catch (err) {
    return next(new AppError("BAD REQUEST", 400));
  }
};

module.exports = userAuth;
