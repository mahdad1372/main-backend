const AppError = require("../appError/appError");

module.exports = (err, req, res, next) => {
  console.log(err);
  let error = err.isOperational ? err : { ...err };

  if (err.message.startsWith("WHERE")) {
    error = new AppError("BAD REQUEST", 400);
  }

  if (err.name === "SyntaxError") {
    error = new AppError("BAD REQUEST", 400);
  }

  if (error.name === "SequelizeValidationError") {
    const msg = error?.errors[0]?.message || "Validation Failed";
    error = new AppError(msg, 400);
  }
  if (err.name === "MulterError") {
    error = new AppError(`${error.message}`, 400);
  }

  if (err.name === "RestError") {
    error = new AppError(`${error.code}`, 400);
  }
  if (error.name === "SequelizeUniqueConstraintError") {
    error = new AppError("SHOULD BE UNIQUE", 400);
  }

  if (error.isOperational) {
    res.status(error.statusCode).send({
      status: error.status,
      message: error.message,
    });
  } else {
    console.log("ERROR: " + err);
    //production
    // res.status(500).send({
    //   status: "error",
    //   message: "Unknown Error",
    // });
    // development
    res.status(500).send(err);
  }
};
