const ComponentCategory = require("../model/componentCategory");
const AppError = require("../appError/appError");

const addUserComponents = async (req, res, next) => {
  const component = await req.userRole.getComponents({
    joinTableAttributes: [],
    include: [ComponentCategory],
  });

  if (!component || !component.length)
    return next(new AppError("NO COMPONENT DEFIEND", 404));

  req.userComponent = component;

  next();
};

module.exports = addUserComponents;
